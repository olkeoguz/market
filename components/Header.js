import React from 'react';
import styles from '../styles/Header.module.css';
import Image from 'next/image';
import Logo from '../assets/Logo.png';
import { faLock, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const Header = ({ handleClick }) => {
  const { cartTotal } = useSelector((state) => state.cart);

  return (
    <div className={styles.header}>
      <FontAwesomeIcon
        icon={faBars}
        color='white'
        size='2x'
        className={styles.drawerMenu}
        onClick={handleClick}
      />
      <Image src={Logo} alt='Picture of the author' className={styles.image} />
      <div className={styles.totalPriceContainer}>
        <FontAwesomeIcon icon={faLock} />
        <p className={styles.price}>₺ {cartTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Header;
