import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';

    return (
        <main
            style={{
                backgroundColor: '#ccffdd',
                height: '100vh',
                padding: '16px',
                marginLeft: adaptiveMargin,
            }}
        >
            <Outlet />
        </main>
    );
};

export default MainContent;
