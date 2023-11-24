import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';

    return (
        <nav
            style={{
                height: '100vh',
                width: adaptiveMargin,
                backgroundColor: '#ffddcc',
                position: 'fixed',
                top: '0',
                zIndex: '1',
            }}
        >
            <ul>
                <li>
                    <Link to={'/'}>Dashboard</Link>
                </li>
                <li>
                    <Link to={'tickets'}>Tickets</Link>
                </li>
                <li>
                    <Link to={'ticket-severities'}>Ticket severities</Link>
                </li>
                <li>
                    <Link to={'ticket-categories'}>Ticket categories</Link>
                </li>
                <li>
                    <Link to={'products'}>Products</Link>
                </li>
                <li>
                    <Link to={'product-categories'}>Product categories</Link>
                </li>
                <li>
                    <Link to={'users'}>Users</Link>
                </li>
                <li>
                    <Link to={'organisations'}>Organisations</Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideNav;
