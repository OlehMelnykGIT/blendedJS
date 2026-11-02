import axios from 'axios';
import { BASE_URL, END_POINTS, LIMIT } from './constants';

axios.defaults.baseURL = BASE_URL;

// Параметри пагінації однакові для всіх списків: сторінка 2 → skip=12
function pageParams(page) {
  return {
    limit: LIMIT,
    skip: (page - 1) * LIMIT,
  };
}

export async function fetchCategories() {
  const { data } = await axios.get(END_POINTS.categories);
  return data;
}

export async function fetchProducts(page = 1) {
  const { data } = await axios.get(END_POINTS.products, {
    params: pageParams(page),
  });
  return data;
}

export async function fetchByCategory(category, page = 1) {
  const { data } = await axios.get(
    `${END_POINTS.productsByCategory}/${category}`,
    { params: pageParams(page) }
  );
  return data;
}

export async function fetchBySearch(query, page = 1) {
  const { data } = await axios.get(END_POINTS.productsBySearch, {
    params: { q: query, ...pageParams(page) },
  });
  return data;
}

export async function fetchProductById(id) {
  const { data } = await axios.get(`${END_POINTS.products}/${id}`);
  return data;
}

// Усі запити стартують одночасно, Promise.all чекає на всі
export function fetchProductsByIds(ids) {
  return Promise.all(ids.map(id => fetchProductById(id)));
}
