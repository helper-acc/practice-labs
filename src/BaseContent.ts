// Базовий інтерфейс для всього контенту
export interface BaseContent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'archived';
}

// Стаття
export interface Article extends BaseContent {
  title: string;
  body: string;
  author: string;
  tags: string[];
}

// Продукт
export interface Product extends BaseContent {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}