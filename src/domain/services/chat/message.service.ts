import { Injectable } from '@nestjs/common';

import { Message } from '@/domain/entities/chat/message.entity';

import { MessageRepository } from '@/domain/repositories/chat/message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  async create(userId: string, data: Message): Promise<Message> {
    return await this.repository.create(userId, data);
  }
}
