import { RouteObject } from 'react-router-dom';
import SchemaService from 'services/schema';

const ElementRoutes: RouteObject[] = SchemaService.GetElementRoutes();

export default ElementRoutes;
