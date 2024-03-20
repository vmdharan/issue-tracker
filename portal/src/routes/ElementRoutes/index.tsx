import { RouteObject } from 'react-router-dom';
import { OrganisationElementRoute } from '../../schemas/organisation';
import { ProductElementRoute } from '../../schemas/product';
import { ProductCategoryElementRoute } from '../../schemas/product_category';
import { TicketElementRoute } from '../../schemas/ticket';
import { TicketSeverityElementRoute } from '../../schemas/ticket_severity';
import { UserElementRoute } from '../../schemas/user';

const ElementRoutes: RouteObject[] = [
    TicketElementRoute,
    TicketSeverityElementRoute,
    TicketElementRoute,
    ProductElementRoute,
    ProductCategoryElementRoute,
    UserElementRoute,
    OrganisationElementRoute,
];

export default ElementRoutes;
