import React from 'react';
import { Outlet } from 'react-router-dom';
import * as styles from './index.module.scss';

const MainContent = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';

    return (
        <main
            className={styles['main-content']}
            style={{ marginLeft: adaptiveMargin }}
        >
            <Outlet />
        </main>
    );
};

export default MainContent;
