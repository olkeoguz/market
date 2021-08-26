import React from 'react';
import styles from './Brands_Tags.module.css';

const BrandsSearchingResults = ({
  suggestions,
  handleChange,
  searchText,
  list,
  filter,
}) => {
  let listItems;

  if (searchText.length === 0) {
    listItems = list.map((manu, index) => (
      <div key={index} className={styles.inputContainer}>
        <input
          type='radio'
          id={manu.name}
          checked={filter === `${manu.name}`}
          onChange={handleChange}
        />
        <label htmlFor={manu.name}>{manu.name}</label>
        <span>({manu.quantity})</span>
      </div>
    ));
  }
  // Searching and no suggestions
  else if (searchText.length > 0 && !suggestions.length > 0) {
    listItems = (
      <div>
        <h5>Brand not found!</h5>
      </div>
    );
  }
  // Searching and items found
  else if (suggestions.length > 0) {
    listItems = suggestions.map((manu, index) => (
      <div key={index} className={styles.inputContainer}>
        <input
          type='radio'
          id={manu.name}
          checked={filter === `${manu.name}`}
          onChange={handleChange}
        />
        <label htmlFor={manu.name}>{manu.name}</label>
        <span>({manu.quantity})</span>
      </div>
    ));
  }

  return <>{listItems}</>;
};

export default BrandsSearchingResults;
