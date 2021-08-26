export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const FILTER_BRANDS = 'FILTER_BRANDS';
export const FILTER_TAGS = 'FILTER_TAGS';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
import { v4 as uuidv4 } from 'uuid';

export const fetchProducts = () => async (dispatch) => {
  try {
    // const res = await fetch('https://my-market-db.herokuapp.com/items');
    const res = await fetch('http://localhost:8000/items');

    if (!res.ok) {
      throw new Error('Something went wrong! Cannot fetch the products...');
    }

    const data = await res.json();

    const products = data.map((item) => ({ ...item, id: uuidv4() }));

    products.sort((a, b) => a.price - b.price);

    dispatch({
      type: SET_PRODUCTS,
      products,
    });
  } catch (error) {
    throw error;
  }
};

export const sortProducts = (sortingOption) => {
  return {
    type: SORT_PRODUCTS,
    sortingOption,
  };
};

export const filterProducts = (brandFilter = 'all', tagFilter = 'all') => {
  return {
    type: FILTER_PRODUCTS,
    brandFilter,
    tagFilter,
  };
};
