import React from 'react'
import styles from '../styles/Backdrop.module.css';

const Backdrop = ({click}) => {
    return (
        <div onClick={click} className={styles.Backdrop}>
            Backdrop
        </div>
    )
}

export default Backdrop
