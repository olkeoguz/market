import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SingleProduct from './SingleProduct';
import Pagination from '../../components/Pagination/Pagination';

import * as productActions from '../../store/actions/products';
import { useSelector, useDispatch } from 'react-redux';

import styles from './ProductList.module.css';

const ProductList = ({ scrollToTop }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { products, filteredProducts } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [numPerPage] = useState(16);

  const dispatch = useDispatch();

  const router = useRouter();

  const { category } = router.query;

  let availableProducts = [];

  if (category === 'mug') {
    availableProducts = filteredProducts.filter((p) => p.itemType === 'mug');
  } else if (category === 'shirt') {
    availableProducts = filteredProducts.filter((p) => p.itemType === 'shirt');
  } else {
    availableProducts = [...filteredProducts];
  }

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const totalNum = availableProducts.length;

  const indexOfLastResult = currentPage * numPerPage;
  const indexOfFirstResult = indexOfLastResult - numPerPage;
  const currentResults = availableProducts.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const paginate = (pageNumber) => {
    if (pageNumber === '...') {
      return;
    }
    setCurrentPage(pageNumber);
    scrollToTop.current.scrollIntoView();
  };

  const pickCategory = (category) => {
    router.push(`?category=${category}`);
  };

  return (
    <>
      <div>
        <h2 className={styles.title}>Products</h2>
        <div className={styles.links}>
          <button
            onClick={() => pickCategory('')}
            className={!router.query.category ? styles.active : ''}
          >
            All
          </button>
          <button
            onClick={() => pickCategory('mug')}
            className={router.query.category == 'mug' ? styles.active : ''}
          >
            Mugs
          </button>
          <button
            onClick={() => pickCategory('shirt')}
            className={router.query.category == 'shirt' ? styles.active : ''}
          >
            Shirts
          </button>
        </div>
        <div className={styles.ProductList}>
          {!!currentResults.length &&
            currentResults.map((product, index) => (
              <SingleProduct key={index} product={product} />
            ))}
        </div>
        <Pagination
          numPerPage={numPerPage}
          totalNum={totalNum}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default ProductList;
