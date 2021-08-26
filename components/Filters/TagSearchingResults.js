import React from 'react';
import styles from './Brands.module.css';

const TagsSearchingResults = ({
  suggestions,
  handleChange,
  searchText,
  tags,
  products,
  tagFilter,
}) => {
  let listItems;

  if (searchText.length === 0) {
    listItems = tags.map((tag, index) => (
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
    ));
  }
  // Searching and no suggestions
  else if (searchText.length > 0 && !suggestions.length > 0) {
    listItems = (
      <div>
        <h5>Tag not found!</h5>
      </div>
    );
  }
  // Searching and items found
  else if (suggestions.length > 0) {
    listItems = suggestions.map((tag, index) => (
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
    ));
  }

  return <>{listItems}</>;
};

export default TagsSearchingResults;
