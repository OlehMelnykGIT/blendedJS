import { STORAGE_KEYS } from './constants';
import {
  clickOnBuyInModal,
  clickOnProduct,
  toggleModalProduct,
} from './handlers';
import {
  initTheme,
  scrollToTop,
  toggleScrollTopBtn,
  toggleTheme,
  updateNavCounts,
} from './helpers';
import { closeModal, onBackdropClick } from './modal';
import { refs } from './refs';

// Те, що однаково працює на всіх трьох сторінках
export function initPage({ onListChange } = {}) {
  initTheme();
  updateNavCounts();

  refs.themeBtn.addEventListener('click', toggleTheme);

  window.addEventListener('scroll', toggleScrollTopBtn);
  refs.scrollTopBtn.addEventListener('click', scrollToTop);

  refs.productList.addEventListener('click', clickOnProduct);

  refs.modalCloseBtn.addEventListener('click', closeModal);
  refs.modal.addEventListener('click', onBackdropClick);
  refs.modalProduct.addEventListener('click', clickOnBuyInModal);
  refs.modalWishlistBtn.addEventListener('click', () =>
    toggleModalProduct(STORAGE_KEYS.wishlist, onListChange)
  );
  refs.modalCartBtn.addEventListener('click', () =>
    toggleModalProduct(STORAGE_KEYS.cart, onListChange)
  );
}
