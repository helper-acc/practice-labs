import { BaseContent } from './BaseContent';

// Система версіонування контенту
export type Versioned<T extends BaseContent> = T & {
  version: number;
  incrementVersion: () => void;
}

// Реалізація для статті
export class VersionedArticle implements Versioned<Article> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'archived';
  title: string;
  body: string;
  author: string;
  tags: string[];
  version: number;

  constructor(article: Article) {
    this.id = article.id;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
    this.publishedAt = article.publishedAt;
    this.status = article.status;
    this.title = article.title;
    this.body = article.body;
    this.author = article.author;
    this.tags = article.tags;
    this.version = 1;
  }

  incrementVersion() {
    this.version += 1;
    this.updatedAt = new Date();
    console.log(`Version incremented to ${this.version}`);
  }
}
