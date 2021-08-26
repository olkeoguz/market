import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/ProductList.module.css';
import SingleProduct from './SingleProduct';
import Pagination from '../components/Pagination';

import * as productActions from '../store/actions/products';

import { useSelector, useDispatch } from 'react-redux';

const ProductList = ({ scrollToTop }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { products, filteredProducts } = useSelector((state) => state.products);
  const [type,setType] = useState("mug");

  const [currentPage, setCurrentPage] = useState(1);
  const [numPerPage] = useState(16);

 

  const dispatch = useDispatch();

  let availableProducts = [];
  if(type==="mug") {
    availableProducts = filteredProducts.filter(p => p.itemType === "mug")
  }
  if(type==="shirt") {
    availableProducts = filteredProducts.filter(p => p.itemType === "shirt")
  }
  const totalNum = availableProducts.length;

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

  console.log(availableProducts.length);

  return (
    <>
      <div>
        <div style={{width: '20%',margin:"0 auto"}}>
          <button onClick={() => setType("mug")}>Mugs</button>
          <button onClick={() => setType("shirt")}>Shirts</button>
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
