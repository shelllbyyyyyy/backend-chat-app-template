import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserPayload } from '@/shared/types/user.payload';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
