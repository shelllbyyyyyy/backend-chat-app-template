import { Message } from '@/domain/entities/chat/message.entity';
import { MessageDocument, Message as MessageModel } from './message.model';
import { MessageRepository } from '@/domain/repositories/chat/message.repository';
import { Injectable } from '@nestjs/common';
import { MessageMapper } from './message.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageRepositoryImpl implements MessageRepository {
  constructor(
    @InjectModel(MessageModel.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(userId: string, data: Message): Promise<Message> {
    const toMongoose = MessageMapper.toMongoose(data);

    const newMesaage = await this.messageModel.create(toMongoose);

    return MessageMapper.toDomain(newMesaage);
  }
}
