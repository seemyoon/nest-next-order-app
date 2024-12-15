import { PermissionEnum } from './enum/permission.enum';
import { UserEnum } from './enum/users.enum';

export const RolePermissions = {
  [UserEnum.ADMIN]: [
    PermissionEnum.SHOW_ALL_ORDERS,
    PermissionEnum.SHOW_ALL_PRODUCTS,
    PermissionEnum.SHOW_ALL_USERS,
  ],
};
