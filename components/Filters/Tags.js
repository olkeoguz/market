import React, { useMemo, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';

import TagsSearchingResults from './TagSearchingResults';

import styles from './Brands_Tags.module.css';

const Tags = () => {
  const { products, brandFilt } = useSelector((state) => state.products);
  const [tagFilter, setTagFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  // When filter change, dispatch the filtering action
  useEffect(() => {
    dispatch(productActions.filterProducts(brandFilt, tagFilter));
    //eslint-disable-next-line
  }, [tagFilter]);

  let tagsSet = new Set();

  tagsSet = useMemo(() => {
    for (let product of products) {
      for (let tag of product.tags) {
        tagsSet.add(tag);
      }
    }
    return tagsSet;
  }, [products]);
  const tags = useMemo(() => [...tagsSet], [tagsSet]);

  const handleChange = (e) => {
    setTagFilter(e.target.id);
  };

  const inputChangeHandler = (text) => {
    let matches = [...tags];
    if (text.length > 0) {
      matches = tags.filter((item) => {
        const regex = new RegExp(`${text}`, 'gi');
        return item.match(regex);
      });
    }
    setSuggestions(matches);
    setSearchText(text);
  };

  return (
    <>
      <h4 className={styles.title}>Tags</h4>
      <div className={styles.RadioContainer}>
        <input
          type='text'
          placeholder='Search tag'
          value={searchText}
          onChange={(e) => inputChangeHandler(e.target.value)}
        />
        <div className={styles.inputContainer}>
          <input
            type='radio'
            id='all'
            checked={tagFilter === 'all'}
            onChange={handleChange}
          />
          <label htmlFor='all'>All</label>
          <span>({products.length})</span>
        </div>
        <TagsSearchingResults
          suggestions={suggestions}
          handleChange={handleChange}
          searchText={searchText}
          tags={tags}
          products={products}
          tagFilter={tagFilter}
        />
      </div>
    </>
  );
};

export default Tags;
