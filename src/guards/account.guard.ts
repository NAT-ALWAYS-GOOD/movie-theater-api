import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const accountIdParam = request.params.id;

    if (!user) {
      throw new UnauthorizedException('You are not logged in.');
    }

    // Récupérer l'ID du compte depuis la base de données
    const userWithAccount = await this.userService.findOneWithAccount(user.id);
    if (!userWithAccount || !userWithAccount.isActive) {
      throw new UnauthorizedException('User not found.');
    }

    return (
      userWithAccount.account.id == accountIdParam ||
      user.role.includes('admin')
    );
  }
}
