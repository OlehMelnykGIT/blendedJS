export const BASE_URL = 'https://dummyjson.com';
export const END_POINTS = {
  categories: '/products/category-list',
  products: '/products',
  productsByCategory: '/products/category',
  productsBySearch: '/products/search',
};

export const LIMIT = 12;

// Ключі localStorage — в одному місці, щоб не помилитись у рядку
export const STORAGE_KEYS = {
  cart: 'cart',
  wishlist: 'wishlist',
  theme: 'theme',
};

export const ALL_CATEGORY = 'All';

/* https://dummyjson.com/docs/products - документація бекенду, розділ продукти
https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з
пагінацією https://dummyjson.com/products/1 - отримати один продукт по ID
https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
https://dummyjson.com/products/category-list - отримати список категорій
продуктів https://dummyjson.com/products/category/smartphones - отримати
продукти по категорії */
