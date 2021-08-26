import {
  SET_PRODUCTS,
  SORT_PRODUCTS,
  FILTER_PRODUCTS,
} from '../actions/products';

const initialState = {
  products: [],
  brandFilt: 'all',
  tagFilt: 'all',
  filteredProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        filteredProducts: action.products,
      };

    case SORT_PRODUCTS:
      switch (action.sortingOption) {
        case 'lowToHigh':
          return {
            ...state,
            filteredProducts: state.filteredProducts.sort(
              (a, b) => a.price - b.price
            ),
            products: state.products.sort((a, b) => a.price - b.price),
          };

        case 'highToLow':
          return {
            ...state,
            filteredProducts: state.filteredProducts.sort(
              (a, b) => b.price - a.price
            ),
            products: state.products.sort((a, b) => b.price - a.price),
          };

        case 'newToOld':
          return {
            ...state,
            filteredProducts: state.filteredProducts.sort(
              (a, b) => b.added - a.added
            ),
            products: state.products.sort((a, b) => b.added - a.added),
          };

        case 'oldToNew':
          return {
            ...state,
            filteredProducts: state.filteredProducts.sort(
              (a, b) => a.added - b.added
            ),
            products: state.products.sort((a, b) => a.added - b.added),
          };
      }

    case FILTER_PRODUCTS:
      const updatedProducts = [...state.products];
      if (action.brandFilter === 'all' && action.tagFilter === 'all') {
        return {
          ...state,
          filteredProducts: [...state.products],
          tagFilt: 'all',
          brandFilt: 'all',
        };
      } else if (action.brandFilter === 'all' && action.tagFilter !== 'all') {
        return {
          ...state,
          filteredProducts: updatedProducts.filter((prod) =>
            prod.tags.includes(action.tagFilter)
          ),
          tagFilt: action.tagFilter,
          brandFilt: action.brandFilter, //
        };
      } else if (action.brandFilter !== 'all' && action.tagFilter === 'all') {
        return {
          ...state,
          filteredProducts: updatedProducts.filter(
            (prod) => prod.manufacturer === action.brandFilter
          ),
          brandFilt: action.brandFilter,
          tagFilt: action.tagFilter, //
        };
      } else if (action.brandFilter !== 'all' && action.tagFilter !== 'all') {
        return {
          ...state,
          filteredProducts: updatedProducts.filter(
            (prod) =>
              prod.manufacturer === action.brandFilter &&
              prod.tags.includes(action.tagFilter)
          ),
          brandFilt: action.brandFilter,
          tagFilt: action.tagFilter,
        };
      }

    default: {
      return state;
    }
  }
};

export default productReducer;
