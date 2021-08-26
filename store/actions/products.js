export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const FILTER_BRANDS = 'FILTER_BRANDS';
export const FILTER_TAGS = 'FILTER_TAGS';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
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
