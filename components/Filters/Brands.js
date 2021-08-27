import React, { useEffect, useMemo, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';

import BrandsSearchingResults from './BrandsSearchingResults';

import styles from './Brands_Tags.module.css';

const Brands = () => {
  const { products, tagFilt } = useSelector((state) => state.products);
  const [brandFilter, setBrandFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  // When filter change, dispatch the filtering action
  useEffect(() => {
    dispatch(productActions.filterProducts(brandFilter, tagFilt));
    //eslint-disable-next-line
  }, [brandFilter]);

  let manuFacturersObj = {};

  manuFacturersObj = useMemo(() => {
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
    return manuFacturersObj;
  }, [products]);

  let manufacturers = [];

  manufacturers = useMemo(() => {
    for (let key in manuFacturersObj) {
      manufacturers.push({ name: key, quantity: manuFacturersObj[key] });
    }
    return manufacturers;
  }, [manuFacturersObj]);

  const handleChange = (e) => {
    setBrandFilter(e.target.id);
  };

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
      <div className={styles.RadioContainer}>
        <input
          type='text'
          placeholder='Search brand'
          value={searchText}
          onChange={(e) => inputChangeHandler(e.target.value)}
        />
        <div className={styles.inputContainer}>
          <label>
            <input
              type='radio'
              id='all'
              checked={brandFilter === 'all'}
              onChange={handleChange}
            />
            All
            <span>({products.length})</span>
          </label>
        </div>
        <BrandsSearchingResults
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
