import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../store/actions/products';
import styles from '../styles/Brands.module.css';

const Tags = () => {
  const { products, brandFilt, tagFilt } = useSelector(
    (state) => state.products
  );
  const [tagFilter, setTagFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  let tagsSet = new Set();

  for (let product of products) {
    for (let tag of product.tags) {
      tagsSet.add(tag);
    }
  }
  const tags = [...tagsSet];

  const handleChange = (e) => {
    setTagFilter(e.target.id);
  };

  // When filter change, dispatch the filtering action
  useEffect(() => {
    dispatch(productActions.filterProducts(brandFilt, tagFilter));
    //eslint-disable-next-line
  }, [tagFilter]);

  return (
    <>
      <h4 className={styles.title}>Tags</h4>
      <div className={styles.Brands}>
        <input type='text' placeholder='Search tag' />
        <div className={styles.inputContainer}>
          <input
            type='checkbox'
            id='all'
            checked={tagFilter === 'all'}
            onChange={handleChange}
          />
          <label htmlFor='all'>All</label>
          <span>({products.length})</span>
        </div>
        {tags.map((tag, index) => (
          <div key={index} className={styles.inputContainer}>
            <input
              type='checkbox'
              id={tag}
              checked={tagFilter === `${tag}`}
              onChange={handleChange}
            />
            <label htmlFor={tag}>{tag}</label>
            <span>
              ({products.filter((prod) => prod.tags.includes(`${tag}`)).length})
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tags;
