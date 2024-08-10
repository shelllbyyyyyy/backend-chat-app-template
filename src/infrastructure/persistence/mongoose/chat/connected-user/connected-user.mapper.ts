import { ConnectedUser } from '@/domain/entities/chat/connected-user.entity';
import { ConnectedUserDocument } from './connected-user.model';

export class ConnectedUserMapper {
  static toDomain(data: ConnectedUserDocument): ConnectedUser {
    return new ConnectedUser(data.userId, data.sockedId);
  }

  static toMongoose(data: ConnectedUser): ConnectedUserDocument {
    return {
      userId: data.getUserId(),
      sockedId: data.getSocketId(),
    } as ConnectedUserDocument;
  }
}
