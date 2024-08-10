import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserService } from '@/domain/services/user/user.service';
import { User } from '@/domain/entities/user/user.entity';

import { GetUserQuery } from '../get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly service: UserService) {}

  async execute(query: GetUserQuery): Promise<User> {
    const { userId } = query;

    const user = await this.service.findUserById(userId);

    return user;
  }
}
