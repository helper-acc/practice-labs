import { BaseContent } from './BaseContent';

export type Role = 'admin' | 'editor' | 'viewer';

export type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

// Система контролю доступу з generics
export type AccessControl<T extends BaseContent> = {
  role: Role;
  permissions: Permission;
  validateAccess: (contentType: T, action: keyof Permission) => boolean;
}