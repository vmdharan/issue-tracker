import { useEffect, useState } from "react";
import GenericSchema from 'services/schema';
import JsonSchema, { JsonSchemaNavLink } from 'types/json_schema';
import ProcessedSchema from "types/processed_schema";

import IconMapper from "helpers/IconMapper";
import * as styles from 'components/organisms/SideNav/index.module.scss';
import { RouteObject } from "react-router-dom";

const useSchema = () => {
    const [processedSchemas, setProcessedSchemas] = useState<ProcessedSchema[]>([]);
    const [schemas, setSchemas] = useState<JsonSchema[]>([]);
    const [navLinks, setNavLinks] = useState<any[]>([]);
    const [elementRoutes, setElementRoutes] = useState<RouteObject[]>([]);
    
    const GetAllSchemas = async () => {
        const schemaResult: JsonSchema[] = await GenericSchema.GetAllSchemas();
        setSchemas(schemaResult);

        const processedSchemaResult: any[] = schemaResult.map((schema: JsonSchema) => GenericSchema.GetProcessedSchema(schema));
        setProcessedSchemas(processedSchemaResult);

        const navLinkResult: JsonSchemaNavLink[] = [
            { target: '/', label: 'Dashboard', icon: 'dashboard' },
            ...processedSchemaResult?.map((schema: ProcessedSchema) => schema.navLink),
        ];
        setNavLinks(navLinkResult?.map((item) => ({
            ...item,
            icon: IconMapper({
                iconName: item?.icon ?? '',
                iconClassName: styles['side-nav-icon'],
            }),
        })));

        setElementRoutes([
            ...processedSchemaResult?.map((schema: any) => schema.elementRoute)
        ]);
    };

    useEffect(() => {
        console.log('getting schemas')
        GetAllSchemas();
    }, []);

    return {
        schemas: schemas,
        processedSchemas: processedSchemas,
        elementRoutes: elementRoutes,
        navLinks: navLinks
    };
};

export default useSchema;