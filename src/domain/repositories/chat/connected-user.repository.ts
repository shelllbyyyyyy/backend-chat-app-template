import { ConnectedUser } from '@/domain/entities/chat/connected-user.entity';

export abstract class ConnectedUserRepository {
  abstract create(data: ConnectedUser): Promise<ConnectedUser>;
  abstract findByUserId(id: string): Promise<ConnectedUser>;
  abstract removeBySocketId(socketId: string): Promise<void>;
  abstract removeByUserId(userId: string): Promise<void>;
}
