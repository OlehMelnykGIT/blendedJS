import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { STORAGE_KEYS } from './constants';
import { refs } from './refs';
import { getCart, getFromLS, getWishlist, saveToLS } from './storage';

export function setActiveCategory(button) {
  refs.categoryList
    .querySelector('.categories__btn--active')
    ?.classList.remove('categories__btn--active');

  button?.classList.add('categories__btn--active');
}

export function toggleNotFound(isVisible) {
  refs.notFoundDiv.classList.toggle('not-found--visible', isVisible);
}

export function toggleLoadMore(isVisible) {
  refs.loadMoreBtn?.classList.toggle('is-hidden', !isVisible);
}

// Лічильник: кілька запитів одночасно (категорії + товари) не ховають лоадер один одному
let activeRequests = 0;

export function showLoader() {
  activeRequests += 1;
  refs.loader.classList.remove('is-hidden');
}

export function hideLoader() {
  activeRequests = Math.max(0, activeRequests - 1);
  if (activeRequests === 0) {
    refs.loader.classList.add('is-hidden');
  }
}

export function updateNavCounts() {
  refs.cartCount.textContent = getCart().length;
  refs.wishlistCount.textContent = getWishlist().length;
}

export function showError(error) {
  console.error(error);
  iziToast.error({
    message: 'Something went wrong. Please try again later.',
    position: 'topRight',
  });
}

export function showMessage(message, type = 'info') {
  iziToast[type]({ message, position: 'topRight' });
}

// Тема: data-theme на body вмикає темні CSS-змінні з base.css
export function applyTheme(theme) {
  document.body.dataset.theme = theme;
  refs.themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

export function initTheme() {
  applyTheme(getFromLS(STORAGE_KEYS.theme, 'light'));
}

export function toggleTheme() {
  const theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  saveToLS(STORAGE_KEYS.theme, theme);
}

export function toggleScrollTopBtn() {
  refs.scrollTopBtn.classList.toggle(
    'scroll-top-btn--visible',
    window.scrollY > 400
  );
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
