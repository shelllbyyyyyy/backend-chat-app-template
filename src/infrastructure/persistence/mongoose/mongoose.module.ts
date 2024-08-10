import { Module } from '@nestjs/common';
import { MongooseModule as Mongoose } from '@nestjs/mongoose';

import { ProfileRepository } from '@/domain/repositories/user/profile.repository';
import { UserRepository } from '@/domain/repositories/user/user.repository';

import { config } from '@/shared/env/config';

import { ProfileRepositoryImpl } from './profile/profile.repository.impl';
import { Profile, ProfileSchema } from './profile/profile.model';

import { UserRepositoryImpl } from './user/user.repository.impl';
import { User, UserSchema } from './user/user.model';
import {
  ConnectedUser,
  ConnectedUserSchema,
} from './chat/connected-user/connected-user.model';
import { ConnectedUserRepository } from '@/domain/repositories/chat/connected-user.repository';
import { ConnectedUserRepositoryImpl } from './chat/connected-user/connected-user.repository.impl';
import { Message, MessageSchema } from './chat/message/message.model';
import { MessageRepository } from '@/domain/repositories/chat/message.repository';
import { MessageRepositoryImpl } from './chat/message/message.repository.impl';

@Module({
  imports: [
    Mongoose.forRoot(config.databaseUrl),
    Mongoose.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    Mongoose.forFeature([{ name: User.name, schema: UserSchema }]),
    Mongoose.forFeature([
      { name: ConnectedUser.name, schema: ConnectedUserSchema },
    ]),
    Mongoose.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: ProfileRepository,
      useClass: ProfileRepositoryImpl,
    },
    {
      provide: ConnectedUserRepository,
      useClass: ConnectedUserRepositoryImpl,
    },
    {
      provide: MessageRepository,
      useClass: MessageRepositoryImpl,
    },
  ],
  exports: [
    ProfileRepository,
    UserRepository,
    ConnectedUserRepository,
    MessageRepository,
  ],
})
export class MongooseModule {}
