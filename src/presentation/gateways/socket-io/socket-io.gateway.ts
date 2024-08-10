import { JwtService } from '@nestjs/jwt';
import { Logger, UnauthorizedException } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  WsException,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { CreateMessageDTO } from '@/presentation/gateways/socket-io/dtos/create-message.dto';
import { MessageServiceImpl } from '@/presentation/gateways/socket-io/service/message.service';
import { ConnectedUserServiceImpl } from '@/presentation/gateways/socket-io/service/connected-user.service';

import { UserPayload } from '@/shared/types/user.payload';
import { WsCurrentUser } from '@/shared/decorators/ws-current-user.decorator';
import { config } from '@/shared/env/config';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Socket;
  private readonly logger = new Logger('ChatGateway');

  constructor(
    private readonly messageService: MessageServiceImpl,
    private readonly connectedUserService: ConnectedUserServiceImpl,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(socket: Socket): Promise<void> {
    try {
      const user = this.authenticateSocket(socket);

      await this.initializeUserConnection(user, socket);
    } catch (error) {
      this.handleConnectionError(socket, error);
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.connectedUserService.removeBySocketId(socket.id);
  }

  @SubscribeMessage('sendMessage')
  async onSendMessage(
    @WsCurrentUser() currentUser: UserPayload,
    @MessageBody() createMessageDto: CreateMessageDTO,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const senderId = currentUser.sub;
    const { recipientId } = createMessageDto;

    try {
      const message = await this.messageService.create(
        senderId,
        createMessageDto,
      );

      const recipient =
        await this.connectedUserService.findByUserId(recipientId);
      if (recipient) {
        this.emitToSocket(
          recipient.getSocketId(),
          'receiveMessage',
          message.getContent(),
        );
      } else {
        throw new WsException('Recipient not connected');
      }
    } catch (error) {
      throw new WsException('Error occurred while sending the message.');
    }
  }

  private async emitToSocket(
    socketId: string,
    event: string,
    payload: any,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.to(socketId).emit(event, payload, (response: any) => {
        if (response && response.error) {
          reject(new Error(response.error));
        } else {
          resolve();
        }
      });
    });
  }

  private authenticateSocket(socket: Socket): UserPayload {
    const token = this.extractJwtToken(socket);
    return this.jwtService.verify<UserPayload>(token, {
      secret: config.jwtSecret,
    });
  }

  private async initializeUserConnection(
    userPayload: UserPayload,
    socket: Socket,
  ): Promise<void> {
    socket.data.user = userPayload;
    await this.connectedUserService.removeByUserId(userPayload.sub);

    await this.connectedUserService.create(userPayload.sub, socket.id);

    this.logger.log(
      `Client connected: ${socket.id} - User ID: ${userPayload.sub}`,
    );
  }

  private handleConnectionError(socket: Socket, error: Error): void {
    this.logger.error(
      `Connection error for socket ${socket.id}: ${error.message}`,
    );
    socket.emit('exception', 'Authentication error');
    socket.disconnect();
  }

  private extractJwtToken(socket: Socket): string {
    const authHeader = socket.handshake.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException('No authorization header found');

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid or missing token');

    return token;
  }
}
