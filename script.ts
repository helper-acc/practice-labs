// Крок 1: Створення типів товарів

// Базовий тип для товару
type BaseProduct = {
  id: number;
  name: string;
  price: number;
  // Інші базові поля, наприклад, опис товару
  description?: string;
};

// Специфічний тип для електроніки
type Electronics = BaseProduct & {
  category: 'electronics';
  brand: string; // Наприклад, бренд електроніки
  model: string; // Модель електроніки
};

// Специфічний тип для одягу
type Clothing = BaseProduct & {
  category: 'clothing';
  size: string; // Розмір одягу
  color: string; // Колір
};

// Специфічний тип для книг
type Book = BaseProduct & {
  category: 'book';
  author: string;
  genre: string;
};


// Крок 2: Створення функцій для пошуку та фільтрації товарів

// Функція для пошуку товару за id
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
  return products.find(product => product.id === id);
};

// Функція для фільтрації товарів за ціною
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
  return products.filter(product => product.price <= maxPrice);
};


// Крок 3: Створення кошика

// Тип для елемента кошика
type CartItem<T> = {
  product: T;
  quantity: number;
};

// Додавання товару в кошик
const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[], 
  product: T, 
  quantity: number
): CartItem<T>[] => {
  const existingItem = cart.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity; // Якщо товар вже є в кошику, збільшуємо кількість
  } else {
    cart.push({ product, quantity }); // Якщо товару ще немає в кошику, додаємо новий
  }
  return cart;
};

// Підрахунок загальної вартості кошика
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};


// Крок 4: Використання функцій

// Створення тестових даних
const electronics: Electronics[] = [
  {
    id: 1,
    name: 'Телефон',
    price: 10000,
    category: 'electronics',
    brand: 'Samsung',
    model: 'Galaxy S21',
  },
  {
    id: 2,
    name: 'Ноутбук',
    price: 30000,
    category: 'electronics',
    brand: 'Apple',
    model: 'MacBook Pro',
  },
];

const clothing: Clothing[] = [
  {
    id: 3,
    name: 'Футболка',
    price: 500,
    category: 'clothing',
    size: 'M',
    color: 'Blue',
  },
  {
    id: 4,
    name: 'Штани',
    price: 1200,
    category: 'clothing',
    size: 'L',
    color: 'Black',
  },
];

// Тестування функцій
const phone = findProduct(electronics, 1);
if (phone) {
  console.log('Знайшли товар:', phone.name);
}

const filteredProducts = filterByPrice(electronics, 15000);
console.log('Товари до 15000:', filteredProducts);

let cart: CartItem<Electronics>[] = [];
if (phone) {
  cart = addToCart(cart, phone, 2);
}
console.log('Кошик після додавання товару:', cart);

const total = calculateTotal(cart);
console.log('Загальна вартість кошика:', total);
