
type JsonSchemaBase = {
    schema_tag: string;
    schema_title: string;
};

type JsonSchemaService = {
    name: string;
};

type JsonSchemaNavLink = {
    target: string;
    label: string;
    icon: string;
};

type JsonSchemaField = {
    type: string;
    minLength?: number;
    maxLength?: number;
};

type JsonSchemaFields = {
    [key: string]: JsonSchemaField;
};

type JsonSchemaOmitFields = {
    [key: string]: boolean;
};

type JsonSchemaDropdownField = {
    entity: string;
    service: string;
}

type JsonSchemaDropdownFields = {
    [key: string]: JsonSchemaDropdownField;
}

type JsonSchema = {
    base: JsonSchemaBase;
    service: JsonSchemaService;
    nav_link: JsonSchemaNavLink;
    fields: JsonSchemaFields;
    omit: JsonSchemaOmitFields;
    dropdowns: JsonSchemaDropdownFields;
};

export default JsonSchema;
export {
    JsonSchemaBase,
    JsonSchemaService,
    JsonSchemaNavLink,
    JsonSchemaFields,
    JsonSchemaOmitFields,
    JsonSchemaDropdownFields
}