import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userIdParam = request.params.userId;

    console.log('request.params : ', request.params);
    console.log('request.user : ', request.user);

    return user.id == userIdParam || user.role.includes('admin');
  }
}
