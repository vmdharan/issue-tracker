import React from 'react';
import { HeaderPropsType } from './types';
import * as styles from './index.module.scss';
import Typography from 'components/atoms/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = ({ handleLogout }: HeaderPropsType) => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';
    const userName = 'user';

    return (
        <header className={styles['header']} style={{ marginLeft: adaptiveMargin }}>
            <AccountCircle className={styles['profile-icon']} />
            <Typography variant='caption'>Welcome {userName}</Typography>
            <span
                className={styles['header-lo-button']}
                onClick={handleLogout}
            >
                Log out
            </span>
        </header>
    );
};

export default Header;
