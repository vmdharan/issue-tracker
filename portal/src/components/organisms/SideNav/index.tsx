import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './index.module.scss';

const SideNav = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';

    const links = [
        { target: '/', label: 'Dashboard' },
        { target: 'tickets', label: 'Tickets' },
        { target: 'ticket-severities', label: 'Ticket severities' },
        { target: 'ticket-categories', label: 'Ticket categories' },
        { target: 'products', label: 'Products' },
        { target: 'product-categories', label: 'Product categories' },
        { target: 'users', label: 'Users' },
        { target: 'organisations', label: 'Organisations' },
    ];

    return (
        <nav className={styles['nav']} style={{ width: adaptiveMargin }}>
            <ul className={styles['side-nav-ul']}>
                {links &&
                    links.map((link) => (
                        <li className={styles['side-nav-li']} key={link.target}>
                            <Link to={link.target} className={styles['side-nav-link']}>{link.label}</Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};

export default SideNav;
