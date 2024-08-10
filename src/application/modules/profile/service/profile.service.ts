import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateProfileDTO } from '@/application/modules/profile/dtos/create-profile.dto';
import { UpdateProfileDTO } from '@/application/modules/profile/dtos/update-profile.dto';

import { Profile } from '@/domain/entities/user/profile.entity';

import { ZodiacService } from '@/shared/lib/zodiac';
import { ChineseHoroscopeService } from '@/shared/lib/horoscope';
import { UserService as UserDomainService } from '@/domain/services/user/user.service';
import { ProfileService as ProfileDomainService } from '@/domain/services/profile/profile.service';

abstract class ProfileService {
  abstract create(email: string, data: CreateProfileDTO): Promise<Profile>;
  abstract findOneById(id: string): Promise<Profile>;
  abstract update(id: string, data: UpdateProfileDTO): Promise<Profile>;
}

const id = randomUUID();

@Injectable()
export class ProfileServiceImpl implements ProfileService {
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly profileDomainService: ProfileDomainService,
    private readonly horoscopeService: ChineseHoroscopeService,
    private readonly zodiacService: ZodiacService,
  ) {}

  async create(email: string, data: CreateProfileDTO): Promise<Profile> {
    const user = await this.userDomainService.findUserByEmail(email);
    if (!user) throw new NotFoundException();

    const { displayName, birthday, gender, height, weight } = data;

    const date = new Date(birthday);

    const horoscope = this.zodiacService.getHoroscopeByBirthdate(date);
    const zodiac = this.horoscopeService.getHoroscopeByBirthdate(date);

    const newProfile = Profile.createProfile({
      id,
      displayName,
      gender,
      birthday: date,
      horoscope,
      zodiac,
      height,
      weight,
    });

    return await this.profileDomainService.create(email, newProfile);
  }

  async findOneById(id: string): Promise<Profile> {
    const profile = await this.profileDomainService.findOneById(id);
    if (!profile) throw new NotFoundException();

    return profile;
  }

  async update(id: string, data: UpdateProfileDTO): Promise<Profile> {
    const { displayName, birthday, gender, height, weight } = data;

    const date = new Date(birthday);

    const horoscope = this.zodiacService.getHoroscopeByBirthdate(date);
    const zodiac = this.horoscopeService.getHoroscopeByBirthdate(date);

    const newProfile = Profile.createProfile({
      id,
      displayName,
      gender,
      birthday: date,
      horoscope,
      zodiac,
      height,
      weight,
    });

    return await this.profileDomainService.update(id, newProfile);
  }
}
