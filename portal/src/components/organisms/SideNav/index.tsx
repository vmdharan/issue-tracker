import React from 'react';
import { Link } from 'react-router-dom';
import Typography from 'components/atoms/Typography';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import CategoryIcon from '@mui/icons-material/Category';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';

import * as styles from './index.module.scss';

const SideNav = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';
    const title = 'Issue Tracker Portal';

    const links = [
        {
            target: '/',
            label: 'Dashboard',
            icon: <DashboardIcon className={styles['side-nav-icon']} />,
        },
        {
            target: 'tickets',
            label: 'Tickets',
            icon: <AssignmentIcon className={styles['side-nav-icon']} />,
        },
        {
            target: 'ticket-severities',
            label: 'Ticket severities',
            icon: <LabelImportantIcon className={styles['side-nav-icon']} />,
        },
        {
            target: 'ticket-categories',
            label: 'Ticket categories',
            icon: <CategoryIcon className={styles['side-nav-icon']} />,
        },
        {
            target: 'products',
            label: 'Products',
            icon: <NewspaperIcon className={styles['side-nav-icon']} />,
        },
        {
            target: 'product-categories',
            label: 'Product categories',
            icon: <FolderIcon className={styles['side-nav-icon']} />,
        },
        {
            target: 'users',
            label: 'Users',
            icon: <PeopleIcon className={styles['side-nav-icon']} />,
        },
        {
            target: 'organisations',
            label: 'Organisations',
            icon: <BusinessIcon className={styles['side-nav-icon']} />,
        },
    ];

    return (
        <nav className={styles['nav']} style={{ width: adaptiveMargin }}>
            <Typography variant="h5" className={styles['nav-title']}>
                {title}
            </Typography>
            <ul className={styles['side-nav-ul']}>
                {links &&
                    links.map((link) => (
                        <li className={styles['side-nav-li']} key={link.target}>
                            {link.icon}
                            <Link
                                to={link.target}
                                className={styles['side-nav-link']}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};

export default SideNav;
