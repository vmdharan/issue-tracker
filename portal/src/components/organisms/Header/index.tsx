import React from 'react';
import { HeaderPropsType } from './types';

const Header = ({ handleLogout }: HeaderPropsType) => {
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
            <>Header</>
            <span
                style={{ marginLeft: '16px', cursor: 'pointer' }}
                onClick={handleLogout}
            >
                Log out
            </span>
        </header>
    );
};

export default Header;
