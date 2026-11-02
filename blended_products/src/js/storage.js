import { STORAGE_KEYS } from './constants';

export function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLS(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data === null ? defaultValue : JSON.parse(data);
  } catch {
    // у сховищі зіпсований рядок (не JSON)
    return defaultValue;
  }
}

export function getCart() {
  return getFromLS(STORAGE_KEYS.cart, []);
}

export function getWishlist() {
  return getFromLS(STORAGE_KEYS.wishlist, []);
}

export function isInList(key, id) {
  return getFromLS(key, []).includes(id);
}

// Додає ID, якщо його немає, або видаляє, якщо є. Повертає true, якщо ID тепер у списку
export function toggleInList(key, id) {
  const ids = getFromLS(key, []);
  const isAdded = !ids.includes(id);
  const newIds = isAdded ? [...ids, id] : ids.filter(item => item !== id);

  saveToLS(key, newIds);
  return isAdded;
}

export function addToList(key, id) {
  if (!isInList(key, id)) {
    toggleInList(key, id);
  }
}

export function clearList(key) {
  saveToLS(key, []);
}
