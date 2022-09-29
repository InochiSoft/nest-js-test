import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomerGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const { user } = request || undefined
    let is_customer = false;
    if (user) {
      is_customer = !user.is_staff
    }
    return is_customer ? request.isAuthenticated() : undefined
  }
}
