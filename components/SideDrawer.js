import React from 'react';
import styles from '../styles/SideDrawer.module.css';
import Brands from './Brands';
import Cart from './Cart';
import Sorting from './Sorting';
import Tags from './Tags';

const SideDrawer = ({ show }) => {
  return (
    <div
      className={
        show ? `${styles.sideDrawer} ${styles.open}` : styles.sideDrawer
      }
    >
      <Sorting />
      <Brands />
      <Tags />
    </div>
  );
};

export default SideDrawer;
