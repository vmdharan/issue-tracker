import React from 'react';
import * as styles from './index.module.scss';
import Typography from 'components/atoms/Typography';

const Footer = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';

    return (
        <footer className={styles['footer']} style={{ marginLeft: adaptiveMargin }}>
            <Typography variant='caption'>© 2024 vmdharan. All rights reserved.</Typography>
        </footer>
    );
};

export default Footer;
