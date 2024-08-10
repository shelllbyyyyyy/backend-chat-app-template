import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ConnectedUser as ConnectedUserModel,
  ConnectedUserDocument,
} from './connected-user.model';
import { ConnectedUserRepository } from '@/domain/repositories/chat/connected-user.repository';
import { ConnectedUser } from '@/domain/entities/chat/connected-user.entity';
import { ConnectedUserMapper } from './connected-user.mapper';

@Injectable()
export class ConnectedUserRepositoryImpl implements ConnectedUserRepository {
  constructor(
    @InjectModel(ConnectedUserModel.name)
    private readonly connectedUserModel: Model<ConnectedUserDocument>,
  ) {}

  async create(data: ConnectedUser): Promise<ConnectedUser> {
    const toMongoose = ConnectedUserMapper.toMongoose(data);
    const result = await this.connectedUserModel.create(toMongoose);

    return ConnectedUserMapper.toDomain(result);
  }

  async findByUserId(userId: string): Promise<ConnectedUser> {
    const connect = await this.connectedUserModel
      .findOne({ userId: userId })
      .exec();

    return ConnectedUserMapper.toDomain(connect);
  }

  async removeBySocketId(socketId: string): Promise<void> {
    await this.connectedUserModel.deleteOne({ socketId }).exec();
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.connectedUserModel.deleteMany({ userId }).exec();
  }
}
