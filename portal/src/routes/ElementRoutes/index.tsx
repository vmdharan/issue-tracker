import { RouteObject } from 'react-router-dom';
import SchemaService from 'services/nav';

const ElementRoutes: RouteObject[] = SchemaService.GetElementRoutes();

export default ElementRoutes;
