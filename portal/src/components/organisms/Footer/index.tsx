import React from 'react';
import * as styles from './index.module.scss';

const Footer = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';

    return (
        <footer className={styles['footer']} style={{ marginLeft: adaptiveMargin }}>
            Footer
        </footer>
    );
};

export default Footer;
