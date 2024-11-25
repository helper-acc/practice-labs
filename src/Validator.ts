export type Validator<T> = {
  validate: (data: T) => ValidationResult;
}

export type ValidationResult = {
  isValid: boolean;
  errors?: string[];
}

// Валідатор для статті
export class ArticleValidator implements Validator<Article> {
  validate(data: Article): ValidationResult {
    const errors: string[] = [];
    if (!data.title) errors.push('Title is required.');
    if (!data.body) errors.push('Body is required.');
    if (!data.author) errors.push('Author is required.');

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }
}

// Валідатор для продукту
export class ProductValidator implements Validator<Product> {
  validate(data: Product): ValidationResult {
    const errors: string[] = [];
    if (!data.name) errors.push('Name is required.');
    if (data.price <= 0) errors.push('Price must be greater than zero.');
    if (data.stockQuantity < 0) errors.push('Stock quantity cannot be negative.');

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }
}

// Композитний валідатор
export class CompositeValidator<T> implements Validator<T> {
  private validators: Validator<T>[];

  constructor(validators: Validator<T>[]) {
    this.validators = validators;
  }

  validate(data: T): ValidationResult {
    let isValid = true;
    let errors: string[] = [];

    for (const validator of this.validators) {
      const result = validator.validate(data);
      if (!result.isValid) {
        isValid = false;
        if (result.errors) {
          errors = errors.concat(result.errors);
        }
      }
    }

    return { isValid, errors: errors.length > 0 ? errors : undefined };
  }
}