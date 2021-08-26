import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../store/actions/products';
import styles from '../styles/Brands.module.css';
import SearchingResults from './SearchingResults';

const Brands = () => {
  const { products, brandFilt, tagFilt } = useSelector(
    (state) => state.products
  );
  const [brandFilter, setBrandFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  let manuFacturersObj = {};

  products.forEach((product) => {
    // if product is in the object, increase the quantity
    // else make the quantity of the product 1
    if (manuFacturersObj[product.manufacturer]) {
      manuFacturersObj = {
        ...manuFacturersObj,
        [product.manufacturer]: manuFacturersObj[product.manufacturer] + 1,
      };
    } else {
      manuFacturersObj = { ...manuFacturersObj, [product.manufacturer]: 1 };
    }
  });

  const manufacturers = [];

  for (let key in manuFacturersObj) {
    manufacturers.push({ name: key, quantity: manuFacturersObj[key] });
  }

  const handleChange = (e) => {
    setBrandFilter(e.target.id);
  };

  // When filter change, dispatch the filtering action
  useEffect(() => {
    dispatch(productActions.filterProducts(brandFilter, tagFilt));
    //eslint-disable-next-line
  }, [brandFilter]);

  const inputChangeHandler = (text) => {
    let matches = [...manufacturers];
    if (text.length > 0) {
      matches = manufacturers.filter((item) => {
        const regex = new RegExp(`${text}`, 'gi');
        return item.name.match(regex);
      });
    }
    setSuggestions(matches);
    setSearchText(text);
  };

  return (
    <>
      <h4 className={styles.title}>Brands</h4>
      <div className={styles.Brands}>
        <input
          type='text'
          placeholder='Search brand'
          value={searchText}
          onChange={(e) => inputChangeHandler(e.target.value)}
        />
        <div className={styles.inputContainer}>
          <input
            type='checkbox'
            id='all'
            checked={brandFilter === 'all'}
            onChange={handleChange}
          />
          <label htmlFor='all'>All</label>
          <span>({products.length})</span>
        </div>
        <SearchingResults
          suggestions={suggestions}
          handleChange={handleChange}
          searchText={searchText}
          list={manufacturers}
          filter={brandFilter}
        />
      </div>
    </>
  );
};

export default Brands;
