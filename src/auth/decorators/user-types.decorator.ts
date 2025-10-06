import { SetMetadata } from '@nestjs/common';
import { UserType } from '../../users/enums/user-type.enums';

export const UserTypes = (...userTypes: UserType[]) => SetMetadata('userTypes', userTypes);