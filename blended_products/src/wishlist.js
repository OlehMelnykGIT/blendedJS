//Логіка сторінки Wishlist
import { initPage } from './js/common';
import { STORAGE_KEYS } from './js/constants';
import { redirectToSearch } from './js/handlers';
import {
  hideLoader,
  showError,
  showLoader,
  toggleNotFound,
} from './js/helpers';
import { fetchProductsByIds } from './js/products-api';
import { refs } from './js/refs';
import { clearProducts, renderProducts } from './js/render-functions';
import { getWishlist } from './js/storage';

async function renderWishlist() {
  const ids = getWishlist();

  clearProducts();
  toggleNotFound(ids.length === 0);
  if (ids.length === 0) {
    return;
  }

  showLoader();
  try {
    const products = await fetchProductsByIds(ids);
    renderProducts(products);
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

initPage({
  // перемальовуємо тільки коли змінився саме wishlist
  onListChange: key => key === STORAGE_KEYS.wishlist && renderWishlist(),
});

renderWishlist();

refs.form.addEventListener('submit', redirectToSearch);
refs.clearSearchBtn.addEventListener('click', () => refs.form.reset());
