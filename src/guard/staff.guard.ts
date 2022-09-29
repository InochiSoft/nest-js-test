import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StaffGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const { user } = request || undefined
    let is_staff = false;
    if (user) {
      is_staff = user.is_staff
    }
    return is_staff ? request.isAuthenticated() : undefined
  }
}
