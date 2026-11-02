import { refs } from './refs';

export function renderCategories(categories) {
  const markup = categories
    .map(
      category => `<li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>`
    )
    .join('');

  refs.categoryList.innerHTML = markup;
}

export function renderProducts(products) {
  const markup = products
    .map(
      ({
        id,
        title,
        category,
        price,
        brand,
        thumbnail,
      }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}" loading="lazy" />
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: </span>${brand || 'no brand'}</p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: $${price}</p>
 </li>`
    )
    .join('');

  refs.productList.insertAdjacentHTML('beforeend', markup);
}

export function clearProducts() {
  refs.productList.innerHTML = '';
}

export function renderModalProduct({
  title,
  description,
  images,
  thumbnail,
  tags = [],
  shippingInformation,
  returnPolicy,
  price,
}) {
  const tagsMarkup = tags.map(tag => `<li>${tag}</li>`).join('');

  refs.modalProduct.innerHTML = `<img class="modal-product__img" src="${images?.[0] || thumbnail}" alt="${title}" />
<div class="modal-product__content">
  <p class="modal-product__title">${title}</p>
  <ul class="modal-product__tags">${tagsMarkup}</ul>
  <p class="modal-product__description">${description}</p>
  <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
  <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
  <p class="modal-product__price">Price: $${price}</p>
  <button class="modal-product__buy-btn" type="button">Buy</button>
</div>`;
}

export function renderCartSummary(products) {
  const total = products.reduce((sum, { price }) => sum + price, 0);

  refs.cartItemsCount.textContent = products.length;
  refs.cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}
