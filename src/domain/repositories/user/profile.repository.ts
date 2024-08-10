import { Injectable } from '@nestjs/common';

import { Profile } from '@/domain/entities/user/profile.entity';

@Injectable()
export abstract class ProfileRepository {
  abstract create(email: string, data: Profile): Promise<Profile>;
  abstract findOneById(id: string): Promise<Profile>;
  abstract update(id: string, data: Profile): Promise<Profile>;
}
