// Елементи, яких немає на поточній сторінці, будуть null
export const refs = {
  categoryList: document.querySelector('.categories'),
  productList: document.querySelector('.products'),
  notFoundDiv: document.querySelector('.not-found'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loader: document.querySelector('.loader'),
  scrollTopBtn: document.querySelector('.scroll-top-btn'),

  form: document.querySelector('.search-form'),
  clearSearchBtn: document.querySelector('.search-form__btn-clear'),
  themeBtn: document.querySelector('.theme-toggle-btn'),
  cartCount: document.querySelector('[data-cart-count]'),
  wishlistCount: document.querySelector('[data-wishlist-count]'),

  modal: document.querySelector('.modal'),
  modalProduct: document.querySelector('.modal-product'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  modalWishlistBtn: document.querySelector('.modal-product__btn--wishlist'),
  modalCartBtn: document.querySelector('.modal-product__btn--cart'),

  cartItemsCount: document.querySelector('[data-count]'),
  cartTotalPrice: document.querySelector('[data-price]'),
  buyBtn: document.querySelector('.cart-summary__btn'),
};
