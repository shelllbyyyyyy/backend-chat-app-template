import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';

import { UserPayload } from '@/shared/types/user.payload';

export const WsCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserPayload => {
    const client: Socket = context.switchToWs().getClient<Socket>();
    return client.data.user;
  },
);
