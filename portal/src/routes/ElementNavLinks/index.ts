import { OrganisationNavLink } from 'schemas/organisation';
import { ProductCategoryNavLink } from 'schemas/product_category';
import { ProductNavLink } from 'schemas/product';
import { UserNavLink } from 'schemas/user';
import { TicketCategoryNavLink } from 'schemas/ticket_category';
import { TicketSeverityNavLink } from 'schemas/ticket_severity';
import { TicketNavLink } from 'schemas/ticket';
import IconMapper from 'helpers/IconMapper';
import DashboardNavLink from 'schemas/dashboard';

import * as styles from 'components/organisms/SideNav/index.module.scss';

const ElementNavLinks = [
    DashboardNavLink,
    OrganisationNavLink,
    ProductCategoryNavLink,
    ProductNavLink,
    TicketCategoryNavLink,
    TicketSeverityNavLink,
    TicketNavLink,
    UserNavLink,
].map((item) => ({
    ...item,
    icon: IconMapper({
        iconName: item.icon,
        iconClassName: styles['side-nav-icon'],
    }),
}));

export default ElementNavLinks;
