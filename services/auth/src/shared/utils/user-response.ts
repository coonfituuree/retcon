import type { User } from '../../modules/users/entities/user.entity';
export const publicUser = (user: User) => ({
  id: user.id,
  tenantId: user.tenantId,
  email: user.email,
  role: user.role,
});
