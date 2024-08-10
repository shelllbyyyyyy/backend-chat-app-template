import { Module } from '@nestjs/common';

import { ChineseHoroscopeService } from '@/shared/lib/horoscope';
import { ZodiacService } from '@/shared/lib/zodiac';

import { ProfileServiceImpl } from './service/profile.service';
import { UserService } from '@/domain/services/user/user.service';
import { ProfileService } from '@/domain/services/profile/profile.service';

@Module({
  providers: [
    UserService,
    ProfileService,
    ProfileServiceImpl,
    ChineseHoroscopeService,
    ZodiacService,
  ],
  exports: [UserService, ProfileService, ProfileServiceImpl],
})
export class ProfileModule {}
