import React from 'react';
import { HeaderPropsType } from './types';
import * as styles from './index.module.scss';

const Header = ({ handleLogout }: HeaderPropsType) => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';

    return (
        <header className={styles['header']} style={{ marginLeft: adaptiveMargin }}>
            <>Header</>
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
