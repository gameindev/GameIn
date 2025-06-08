import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/users/enums/user-type.enums';

export const UserTypes = (...userTypes: UserType[]) => SetMetadata('userTypes', userTypes);