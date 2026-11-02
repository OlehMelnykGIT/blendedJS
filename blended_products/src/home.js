//Логіка сторінки Home
import { initPage } from './js/common';
import {
  clearSearch,
  clickOnCategory,
  getCategories,
  getProducts,
  loadMore,
  searchByQuery,
} from './js/handlers';
import { refs } from './js/refs';

initPage();

// ?search=... приходить з форми пошуку на Wishlist і Cart
const searchFromUrl = new URLSearchParams(location.search).get('search') || '';
refs.form.elements.searchValue.value = searchFromUrl;

getCategories();
getProducts(searchFromUrl);

refs.categoryList.addEventListener('click', clickOnCategory);
refs.form.addEventListener('submit', searchByQuery);
refs.clearSearchBtn.addEventListener('click', clearSearch);
refs.loadMoreBtn.addEventListener('click', loadMore);
