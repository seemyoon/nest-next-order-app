import { SetMetadata } from '@nestjs/common';

import { PermissionEnum } from '../enum/permission.enum';

export const PERMISSIONS_KEY = 'permissions';
export const PERMISSIONS = (...permissions: PermissionEnum[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
