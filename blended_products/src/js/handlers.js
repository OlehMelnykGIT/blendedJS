import { ALL_CATEGORY, LIMIT, STORAGE_KEYS } from './constants';
import {
  hideLoader,
  setActiveCategory,
  showError,
  showLoader,
  showMessage,
  toggleLoadMore,
  toggleNotFound,
  updateNavCounts,
} from './helpers';
import {
  closeModal,
  getModalProductId,
  openModal,
  updateModalButtons,
} from './modal';
import {
  fetchByCategory,
  fetchBySearch,
  fetchCategories,
  fetchProductById,
  fetchProducts,
} from './products-api';
import { refs } from './refs';
import {
  clearProducts,
  renderCategories,
  renderProducts,
} from './render-functions';
import { addToList, toggleInList } from './storage';

// Що зараз показано на Home: Load More має довантажувати той самий список
const state = {
  page: 1,
  category: ALL_CATEGORY,
  query: '',
};

function requestProducts() {
  const { page, category, query } = state;

  if (query) {
    return fetchBySearch(query, page);
  }
  if (category !== ALL_CATEGORY) {
    return fetchByCategory(category, page);
  }
  return fetchProducts(page);
}

// Сторінка 2 з LIMIT=12 показує товари до 24-го: якщо total більший, є ще
function hasMorePages(total) {
  return state.page * LIMIT < total;
}

// Перша сторінка поточного списку: очищаємо все й малюємо з нуля
async function showFirstPage() {
  state.page = 1;
  clearProducts();
  toggleNotFound(false);
  toggleLoadMore(false);
  showLoader();

  try {
    const { products, total } = await requestProducts();

    if (products.length === 0) {
      toggleNotFound(true);
      return;
    }

    renderProducts(products);
    toggleLoadMore(hasMorePages(total));
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

/* ---------- Home ---------- */

export async function getCategories() {
  showLoader();
  try {
    const categories = await fetchCategories();
    renderCategories([ALL_CATEGORY, ...categories]);
    setActiveCategory(refs.categoryList.querySelector('.categories__btn'));
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

export function getProducts(query = '') {
  state.category = ALL_CATEGORY;
  state.query = query;
  return showFirstPage();
}

export function clickOnCategory(event) {
  const button = event.target.closest('.categories__btn');
  if (!button) {
    return;
  }

  setActiveCategory(button);
  refs.form.reset();

  state.category = button.textContent.trim();
  state.query = '';
  showFirstPage();
}

export function searchByQuery(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchValue.value.trim();

  if (query === '') {
    showMessage('Enter a word to search', 'warning');
    return;
  }

  setActiveCategory(null);
  state.category = ALL_CATEGORY;
  state.query = query;
  showFirstPage();
}

export function clearSearch() {
  refs.form.reset();
  setActiveCategory(refs.categoryList.querySelector('.categories__btn'));
  getProducts();
}

export async function loadMore() {
  state.page += 1;
  refs.loadMoreBtn.classList.add('is-loading');

  try {
    const { products, total } = await requestProducts();
    renderProducts(products);

    if (!hasMorePages(total)) {
      toggleLoadMore(false);
      showMessage("You've reached the end of the product list");
    }
  } catch (error) {
    state.page -= 1;
    showError(error);
  } finally {
    refs.loadMoreBtn.classList.remove('is-loading');
  }
}

/* ---------- Wishlist / Cart: пошук з хедера веде на Home ---------- */

export function redirectToSearch(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchValue.value.trim();

  if (query === '') {
    showMessage('Enter a word to search', 'warning');
    return;
  }

  location.href = `./index.html?search=${encodeURIComponent(query)}`;
}

/* ---------- Модалка (на всіх сторінках) ---------- */

export async function clickOnProduct(event) {
  const card = event.target.closest('.products__item');
  if (!card) {
    return;
  }

  showLoader();
  try {
    const product = await fetchProductById(card.dataset.id);
    openModal(product);
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

// onChange — колбек сторінки: Wishlist і Cart перемальовують свій список
export function toggleModalProduct(key, onChange) {
  const id = getModalProductId();
  toggleInList(key, id);

  updateModalButtons(id);
  updateNavCounts();
  onChange?.(key);
}

export function clickOnBuyInModal(event) {
  if (!event.target.closest('.modal-product__buy-btn')) {
    return;
  }

  addToList(STORAGE_KEYS.cart, getModalProductId());
  closeModal();
  location.href = './cart.html';
}
