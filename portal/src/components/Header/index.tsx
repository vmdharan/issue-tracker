import React from 'react';

const Header = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';

    return (
        <header
            style={{
                backgroundColor: '#ccddff',
                padding: '16px',
                marginLeft: adaptiveMargin,
            }}
        >
            Header
        </header>
    );
};

export default Header;
