import React from 'react';

const Footer = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';

    return (
        <footer
            style={{
                backgroundColor: '#ddccff',
                padding: '16px',
                width: '100%',
                bottom: '0',
                position: 'fixed',
                marginLeft: adaptiveMargin,
            }}
        >
            Footer
        </footer>
    );
};

export default Footer;
