import { useState, useRef } from 'react';
import Backdrop from '../components/Backdrop';
import Brands from '../components/Brands';
import Cart from '../components/Cart';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import SideDrawer from '../components/SideDrawer';
import Sorting from '../components/Sorting';
import Tags from '../components/Tags';
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
    <div className={styles.container} ref={scrollToProductsRef}>
      <Header handleClick={handleDrawerToggleClick} />
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
  );
}
