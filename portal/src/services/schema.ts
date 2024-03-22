import { DashboardElementRoute, DashboardNavLink } from "schemas/dashboard";
import { OrganisationElementRoute, OrganisationNavLink } from 'schemas/organisation';
import { ProductCategoryElementRoute, ProductCategoryNavLink } from "schemas/product_category";
import { ProductElementRoute, ProductNavLink } from "schemas/product";
import { TicketCategoryElementRoute, TicketCategoryNavLink } from "schemas/ticket_category";
import { TicketSeverityElementRoute, TicketSeverityNavLink } from "schemas/ticket_severity";
import { TicketElementRoute, TicketNavLink } from "schemas/ticket";
import { UserElementRoute, UserNavLink } from "schemas/user";

const GetNavLinks = () => {
    return [
        DashboardNavLink,
        OrganisationNavLink,
        ProductCategoryNavLink,
        ProductNavLink,
        TicketCategoryNavLink,
        TicketSeverityNavLink,
        TicketNavLink,
        UserNavLink
    ];
};

const GetElementRoutes = () => {
    return [
        DashboardElementRoute,
        TicketElementRoute,
        TicketSeverityElementRoute,
        TicketCategoryElementRoute,
        ProductElementRoute,
        ProductCategoryElementRoute,
        UserElementRoute,
        OrganisationElementRoute,
    ];
}

export default { 
    GetNavLinks, 
    GetElementRoutes 
};