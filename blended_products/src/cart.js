//Логіка сторінки Cart
import { initPage } from './js/common';
import { STORAGE_KEYS } from './js/constants';
import { redirectToSearch } from './js/handlers';
import {
  hideLoader,
  showError,
  showLoader,
  showMessage,
  toggleNotFound,
  updateNavCounts,
} from './js/helpers';
import { fetchProductsByIds } from './js/products-api';
import { refs } from './js/refs';
import {
  clearProducts,
  renderCartSummary,
  renderProducts,
} from './js/render-functions';
import { clearList, getCart } from './js/storage';

async function renderCart() {
  const ids = getCart();

  clearProducts();
  renderCartSummary([]);
  toggleNotFound(ids.length === 0);
  if (ids.length === 0) {
    return;
  }

  showLoader();
  try {
    const products = await fetchProductsByIds(ids);
    renderProducts(products);
    renderCartSummary(products);
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

function buyProducts() {
  if (getCart().length === 0) {
    showMessage('Your cart is empty', 'warning');
    return;
  }

  showMessage('Thank you! Your order has been placed.', 'success');
  clearList(STORAGE_KEYS.cart);
  updateNavCounts();
  renderCart();
}

initPage({
  onListChange: key => key === STORAGE_KEYS.cart && renderCart(),
});

renderCart();

refs.form.addEventListener('submit', redirectToSearch);
refs.clearSearchBtn.addEventListener('click', () => refs.form.reset());
refs.buyBtn.addEventListener('click', buyProducts);
