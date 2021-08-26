import React from 'react';

import Brands from '../filters/Brands';
import Sorting from '../filters/Sorting';
import Tags from '../filters/Tags';

import styles from './/SideDrawer.module.css';

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
