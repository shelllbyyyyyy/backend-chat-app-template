import { Message } from '@/domain/entities/chat/message.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MessageRepository {
  abstract create(userId: string, data: Message): Promise<Message>;
}
