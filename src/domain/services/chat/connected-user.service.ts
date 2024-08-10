import { Injectable } from '@nestjs/common';

import { ConnectedUser } from '@/domain/entities/chat/connected-user.entity';
import { ConnectedUserRepository } from '@/domain/repositories/chat/connected-user.repository';

@Injectable()
export class ConnectedUserService {
  constructor(private readonly repository: ConnectedUserRepository) {}

  async create(userId: string, socketId: string): Promise<ConnectedUser> {
    const connect = new ConnectedUser(userId, socketId);

    return await this.repository.create(connect);
  }

  async findByUserId(userId: string): Promise<ConnectedUser> {
    const socketId = this.repository.findByUserId(userId);

    return socketId;
  }

  async removeBySocketId(socketId: string): Promise<void> {
    return await this.repository.removeBySocketId(socketId);
  }

  async removeByUserId(userId: string): Promise<void> {
    return await this.repository.removeByUserId(userId);
  }
}
