import { RouteObject } from 'react-router-dom';
import { OrganisationElementRoute } from 'schemas/organisation';
import { ProductElementRoute } from 'schemas/product';
import { ProductCategoryElementRoute } from 'schemas/product_category';
import { TicketElementRoute } from 'schemas/ticket';
import { TicketSeverityElementRoute } from 'schemas/ticket_severity';
import { TicketCategoryElementRoute } from 'schemas/ticket_category';
import { UserElementRoute } from 'schemas/user';

const ElementRoutes: RouteObject[] = [
    TicketElementRoute,
    TicketSeverityElementRoute,
    TicketCategoryElementRoute,
    ProductElementRoute,
    ProductCategoryElementRoute,
    UserElementRoute,
    OrganisationElementRoute,
];

export default ElementRoutes;
