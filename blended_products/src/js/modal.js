import { STORAGE_KEYS } from './constants';
import { refs } from './refs';
import { renderModalProduct } from './render-functions';
import { isInList } from './storage';

export function updateModalButtons(id) {
  refs.modalWishlistBtn.textContent = isInList(STORAGE_KEYS.wishlist, id)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';

  refs.modalCartBtn.textContent = isInList(STORAGE_KEYS.cart, id)
    ? 'Remove from Cart'
    : 'Add to Cart';
}

export function openModal(product) {
  renderModalProduct(product);
  // ID відкритого продукту читають кнопки Add/Remove
  refs.modal.dataset.id = product.id;
  updateModalButtons(product.id);

  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  // слухач клавіатури живе тільки поки модалка відкрита
  document.addEventListener('keydown', onEscPress);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onEscPress);
}

export function getModalProductId() {
  return Number(refs.modal.dataset.id);
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

export function onBackdropClick(event) {
  // клік саме по бекдропу, а не по вмісту модалки
  if (event.target === event.currentTarget) {
    closeModal();
  }
}
