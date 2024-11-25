import { BaseContent } from './BaseContent';

// Generic тип для операцій з контентом
export type ContentOperations<T extends BaseContent> = {
  create: (content: T) => T;
  read: (id: string) => T | undefined;
  update: (id: string, content: Partial<T>) => T | undefined;
  delete: (id: string) => boolean;
}