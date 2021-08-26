import { useState, useRef } from 'react';

import Header from '../components/UI/Header';
import Backdrop from '../components/UI/Backdrop';
import SideDrawer from '../components/UI/SideDrawer';

import Brands from '../components/filters/Brands';
import Tags from '../components/filters/Tags';
import Sorting from '../components/filters/Sorting';

import ProductList from '../components/products/ProductList';
import Cart from '../components/cart/Cart';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const scrollToProductsRef = useRef(null);

  const handleDrawerToggleClick = () => {
    setSideDrawerOpen((prevDrawerState) => !prevDrawerState);
  };

  const handleBackDropClick = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={handleBackDropClick} />;
  }

  return (
    <>
      <Header handleClick={handleDrawerToggleClick} />
      <div className={styles.container} ref={scrollToProductsRef}>
        <SideDrawer show={sideDrawerOpen} />
        {backdrop}
        <div className={styles.grid}>
          <div className={styles.first}>
            <Sorting />
            <Brands />
            <Tags />
          </div>
          <div className={styles.second}>
            <ProductList scrollToTop={scrollToProductsRef} />
          </div>
          <div className={styles.third}>
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
}
