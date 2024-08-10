import { Injectable } from '@nestjs/common';

import { Profile } from '@/domain/entities/user/profile.entity';
import { ProfileRepository } from '@/domain/repositories/user/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async create(email: string, data: Profile): Promise<Profile> {
    return await this.repository.create(email, data);
  }

  async findOneById(id: string): Promise<Profile> {
    return await this.repository.findOneById(id);
  }

  async update(id: string, data: Profile): Promise<Profile> {
    return await this.repository.update(id, data);
  }
}
