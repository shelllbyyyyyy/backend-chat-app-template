import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Profile } from '@/domain/entities/user/profile.entity';
import { ProfileRepository } from '@/domain/repositories/user/profile.repository';

import { ProfileDocument, Profile as ProfileModel } from './profile.model';
import { ProfileMapper } from './profile.mapper';
import { User as USerModel, UserDocument } from '../user/user.model';

@Injectable()
export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(
    @InjectModel(ProfileModel.name)
    private profileModel: Model<ProfileDocument>,
    @InjectModel(USerModel.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(email: string, data: Profile): Promise<Profile> {
    const newProfile = await this.profileModel.create(
      ProfileMapper.toMongoose(data),
    );

    await this.userModel.findOneAndUpdate(
      { email },
      { $set: { profile: newProfile._id } },
      { new: true },
    );

    return ProfileMapper.toDomain(newProfile);
  }

  async findOneById(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id);

    if (!profile) return null;

    return ProfileMapper.toDomain(profile);
  }

  async update(id: string, data: Profile): Promise<Profile> {
    const updateProfile = await this.profileModel.findByIdAndUpdate(
      { id },
      { $set: { data } },
      { new: true },
    );

    return ProfileMapper.toDomain(updateProfile);
  }
}
