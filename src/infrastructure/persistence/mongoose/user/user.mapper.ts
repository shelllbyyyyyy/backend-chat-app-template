import { User } from '@/domain/entities/user/user.entity';

import { UserDocument } from './user.model';
import { ProfileMapper } from '../profile/profile.mapper';
import { ProfileDocument } from '../profile/profile.model';

export class UserMapper {
  static toDomain(data: UserDocument): User {
    const profile = data.profile
      ? ProfileMapper.toDomain(data.profile as ProfileDocument)
      : undefined;
    return new User(
      data._id.toString(),
      data.username,
      data.email,
      undefined,
      profile ?? undefined,
      data.createdAt,
      data.updatedAt,
    );
  }

  static toDomainWithPassword(data: UserDocument): User {
    const profile = data.profile
      ? ProfileMapper.toDomain(data.profile as ProfileDocument)
      : undefined;
    return new User(
      data._id.toString(),
      data.username,
      data.email,
      data.password,
      profile ?? undefined,
      data.createdAt,
      data.updatedAt,
    );
  }

  static toMongoose(data: User): UserDocument {
    const profile = data.getProfile()
      ? ProfileMapper.toMongoose(data.getProfile())
      : undefined;
    return {
      username: data.getUsername(),
      email: data.getEmail(),
      password: data.getPassword(),
      profile: profile ? profile._id : undefined,
    } as UserDocument;
  }
}
