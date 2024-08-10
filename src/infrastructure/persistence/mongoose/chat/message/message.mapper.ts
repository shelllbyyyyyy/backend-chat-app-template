import { Message } from '@/domain/entities/chat/message.entity';
import { MessageDocument } from './message.model';

export class MessageMapper {
  static toDomain(data: MessageDocument): Message {
    return new Message(
      data._id as string,
      data.receiverId,
      data.senderId,
      data.content,
      data.createdAt,
    );
  }

  static toMongoose(data: Message): MessageDocument {
    return {
      receiverId: data.getReceiverId(),
      senderId: data.getSenderId(),
      content: data.getContent(),
    } as MessageDocument;
  }
}
