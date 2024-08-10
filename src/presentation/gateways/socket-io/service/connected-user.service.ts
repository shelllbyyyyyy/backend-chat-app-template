import { Injectable, NotFoundException } from '@nestjs/common';

import { ConnectedUser } from '@/domain/entities/chat/connected-user.entity';
import { ConnectedUserService as ConnectedUserDomainService } from '@/domain/services/chat/connected-user.service';
import { UserService as UserDomainService } from '@/domain/services/user/user.service';

abstract class ConnectedUserService {
  abstract create(userId: string, socketId: string): Promise<ConnectedUser>;
  abstract findByUserId(userId: string): Promise<ConnectedUser>;
  abstract removeBySocketId(socketId: string): Promise<void>;
  abstract removeByUserId(userId: string): Promise<void>;
}

@Injectable()
export class ConnectedUserServiceImpl implements ConnectedUserService {
  constructor(
    private readonly connectedUserDomainService: ConnectedUserDomainService,
    private readonly userDomainService: UserDomainService,
  ) {}

  async create(userId: string, socketId: string): Promise<ConnectedUser> {
    const user = await this.userDomainService.findUserById(userId);

    if (!user) throw new NotFoundException();

    return await this.connectedUserDomainService.create(userId, socketId);
  }

  async findByUserId(userId: string): Promise<ConnectedUser> {
    const socketId = await this.connectedUserDomainService.findByUserId(userId);

    return socketId;
  }

  async removeBySocketId(socketId: string): Promise<void> {
    return await this.connectedUserDomainService.removeBySocketId(socketId);
  }

  async removeByUserId(userId: string): Promise<void> {
    return await this.connectedUserDomainService.removeByUserId(userId);
  }
}
