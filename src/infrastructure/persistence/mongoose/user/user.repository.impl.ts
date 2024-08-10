import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '@/domain/entities/user/user.entity';
import { UserRepository } from '@/domain/repositories/user/user.repository';

import { UserMapper } from './user.mapper';
import { UserDocument, User as UserModel } from './user.model';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().populate('profile').exec();

    return users.map((user) => UserMapper.toDomain(user));
  }

  async create(data: User): Promise<User> {
    const toMongoose = UserMapper.toMongoose(data);

    const newUser = await this.userModel.create(toMongoose);

    return UserMapper.toDomain(newUser);
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async findUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async findUserWithPassword(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) return null;

    return UserMapper.toDomainWithPassword(user);
  }

  async update(data: User): Promise<User> {
    const toMongoose = UserMapper.toMongoose(data);

    const updateUser = await this.userModel.findOneAndUpdate(
      { email: data.getEmail() },
      { $set: toMongoose },
      { new: true },
    );

    return UserMapper.toDomain(updateUser);
  }
}
