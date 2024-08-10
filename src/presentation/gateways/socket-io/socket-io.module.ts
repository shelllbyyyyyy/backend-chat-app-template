import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConnectedUserService } from '@/domain/services/chat/connected-user.service';
import { UserService } from '@/domain/services/user/user.service';

import { ConnectedUserServiceImpl } from './service/connected-user.service';
import { MessageService } from '@/domain/services/chat/message.service';
import { MessageServiceImpl } from './service/message.service';
import { SocketGateway } from './socket-io.gateway';

@Module({
  providers: [
    JwtService,
    UserService,
    MessageService,
    MessageServiceImpl,
    ConnectedUserService,
    ConnectedUserServiceImpl,
    SocketGateway,
  ],
  exports: [
    UserService,
    ConnectedUserService,
    ConnectedUserServiceImpl,
    MessageService,
    MessageServiceImpl,
    JwtService,
    SocketGateway,
  ],
})
export class SocketIOModule {}
