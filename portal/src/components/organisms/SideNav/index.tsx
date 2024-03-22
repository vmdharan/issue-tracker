import React from 'react';
import { Link } from 'react-router-dom';
import Typography from 'components/atoms/Typography';
import * as styles from './index.module.scss';
import { JsonSchemaNavLink } from 'types/json_schema';
import useSchema from 'hooks/useSchema';

const SideNav = () => {
    const isSideBarOpen = true;
    const adaptiveMargin = isSideBarOpen ? '200px' : '48px';
    const title = 'Issue Tracker Portal';
    const { navLinks } = useSchema();

    if(!navLinks) {
        return <></>;
    }

    return (
        <nav className={styles['nav']} style={{ width: adaptiveMargin }}>
            <Typography variant="h5" className={styles['nav-title']}>
                {title}
            </Typography>
            <ul className={styles['side-nav-ul']}>
                {navLinks &&
                    navLinks.map((link: JsonSchemaNavLink) => (
                        <li className={styles['side-nav-li']} key={link.target}>
                            {link.icon}
                            <Link
                                to={link.target ?? '/'}
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
