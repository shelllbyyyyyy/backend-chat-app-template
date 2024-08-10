import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

import { Message } from '@/domain/entities/chat/message.entity';
import { MessageService as MessageDomainService } from '@/domain/services/chat/message.service';

import { CreateMessageDTO } from '../dtos/create-message.dto';

abstract class MesssageService {
  abstract create(
    userId: string,
    createMessageDTO: CreateMessageDTO,
  ): Promise<Message>;
}

@Injectable()
export class MessageServiceImpl implements MesssageService {
  constructor(private readonly messageDomainService: MessageDomainService) {}

  async create(
    userId: string,
    createMessageDTO: CreateMessageDTO,
  ): Promise<Message> {
    const { content, recipientId } = createMessageDTO;

    const newMessage = new Message(
      randomUUID(),
      recipientId,
      userId,
      content,
      new Date(),
    );

    return await this.messageDomainService.create(userId, newMessage);
  }
}
