import { BaseContent, Article, Product } from './BaseContent';
import { ContentOperations } from './ContentOperations';
import { AccessControl } from './AccessControl';
import { Validator, ValidationResult, ArticleValidator, ProductValidator, CompositeValidator } from './Validator';
import { VersionedArticle } from './Versioned';

// Створення операцій для статей
const articleOperations: ContentOperations<Article> = {
  create: (content) => {
    console.log("Creating article", content);
    return content;
  },
  read: (id) => {
    console.log("Reading article with ID", id);
    return undefined;
  },
  update: (id, content) => {
    console.log("Updating article with ID", id);
    return undefined;
  },
  delete: (id) => {
    console.log("Deleting article with ID", id);
    return true;
  }
};

// Приклад використання AccessControl
const articleAccessControl: AccessControl<Article> = {
  role: 'editor',
  permissions: {
    create: true,
    read: true,
    update: true,
    delete: false
  },
  validateAccess: (contentType, action) => {
    const permission = articleAccessControl.permissions[action];
    console.log(`Action: ${action}, Permission: ${permission}`);
    return permission;
  }
};

// Валідатор для статті
const articleValidator = new ArticleValidator();
const article = { id: '1', createdAt: new Date(), updatedAt: new Date(), title: '', body: '', author: '', tags: [], status: 'draft' };
const validation = articleValidator.validate(article);
console.log(validation);

// Версіонування статті
const versionedArticle = new VersionedArticle(article);
versionedArticle.incrementVersion();