import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/users/enums/user-type.enums';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from 'src/auth/contants/auth.contants';

@Injectable()
export class UserTypeGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredUserTypes = this.reflector.getAllAndOverride<UserType[]>('userTypes', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredUserTypes) {
            return true; // No specific user types required, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user: ActiveUserData = request[REQUEST_USER_KEY];

        if (!user) {
            throw new UnauthorizedException('User not authenticated.');
        }

        // If the user is an ADMIN, they have full access
        if (user.user_type === UserType.ADMIN) {
            return true;
        }

        // Check if the user's type is among the required types
        const hasRequiredType = requiredUserTypes.some(type => user.user_type === type);

        if (!hasRequiredType) {
            return false; // User does not have the required user type
        }

        // For non-ADMIN users, check if the requested resource ID matches the user's ID
        // This assumes the resource ID is passed as a parameter named 'id' or 'userId'
        const resourceId = request.params.id || request.params.user_id;

        if (resourceId && String(resourceId) !== String(user.sub)) {
            return false; // User is trying to access a resource that doesn't belong to them
        }

        return true;
    }
}