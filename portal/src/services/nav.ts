import GenericSchema from 'services/schema';

const GetNavLinks = () => {
    return [
        { target: '/', label: 'Dashboard', icon: 'dashboard' },
        ...GenericSchema.GetAllSchemas().map(schema => GenericSchema.GetSchema(schema.base.schema_tag)?.navLink),
    ];
};

const GetElementRoutes = () => {
    return [
        ...GenericSchema.GetAllSchemas().map(schema => GenericSchema.GetSchema(schema.base.schema_tag)?.elementRoute ?? {}),
    ];
}

export default { 
    GetNavLinks, 
    GetElementRoutes 
};