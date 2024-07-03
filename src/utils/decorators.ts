import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AutehnticatedRequest } from './types';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = <AutehnticatedRequest>ctx.switchToHttp().getRequest();
    return request.user;
  },
);
