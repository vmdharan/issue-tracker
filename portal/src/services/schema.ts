import organisation from 'schemas/organisation.json';
import product_category from 'schemas/product_category.json';
import product from 'schemas/product.json';
import ticket_category from 'schemas/ticket_category.json';
import ticket_severity from 'schemas/ticket_severity.json';
import tickets from 'schemas/tickets.json';
import user from 'schemas/user.json';

import MakeElementRoute from 'routes/MakeElementRoute';
import FormSchemaType, { 
    ElementContentProps, 
    ElementEditFormProps, 
    ListSchema, 
    ServiceAPI 
} from 'types/schema';

import CoreService from 'services/core';
import UserService from 'services/user';
import { ZodString, z } from 'zod';
import JsonSchema from 'types/json_schema';
import toSentenceCase from 'helpers/toSentenceCase';

const MAX_DESCRIPTION_LENGTH = 128;

const GetAllSchemas = () => {
    return [
        organisation,
        product_category,
        product,
        ticket_category,
        ticket_severity,
        tickets,
        user
    ]
};

const GetSchema = (elementType: string) => {
    const schema: JsonSchema | undefined = GetAllSchemas().find(schema => schema.base.schema_tag == elementType);

    if (!schema) {
        return null;
    }

    let schemaFields = {}
    Object.keys(schema.fields).forEach((field, i) => {
        if (schema.fields[field].type == 'string') {
            let fieldType = z.string();
            if (schema.fields[field]?.minLength) {
                fieldType = fieldType.min(schema.fields[field].minLength ?? 0);
            }
            if (schema.fields[field]?.maxLength) {
                fieldType = fieldType.max(schema.fields[field].maxLength ?? 0);
            }
            schemaFields = {
                ...schemaFields,
                [field]: fieldType
            };
        }
    });

    const TargetSchema = z.object({
        ...schemaFields
    });

    const TargetFormSchema: FormSchemaType[] = Object.entries(
        TargetSchema.shape,
    ).map((entry) => {
        if(Object.keys(schema.dropdowns).includes(entry[0])) {
            return {
                name: entry[0],
                type: 'Select',
                entity: schema.dropdowns[entry[0]]?.entity,
            };
        }
        else if (
            entry[1] instanceof ZodString &&
            entry[1].maxLength == MAX_DESCRIPTION_LENGTH
        ) {
            return {
                name: entry[0],
                type: 'TextArea',
                checks: entry[1]?._def.checks.filter((f) => f != undefined),
            };
        } else if (entry[1] instanceof ZodString) {
            return {
                name: entry[0],
                type: 'TextField',
                checks: entry[1]?._def.checks.filter((f) => f != undefined),
            };
        }

        return {
            name: entry[0],
            type: 'TextField',
        };
    });

    const TargetSchemaSubset = TargetSchema.omit({...schema.omit});
    const TargetListSchema: ListSchema[] = Object.keys(
        TargetSchemaSubset.keyof().Values,
    ).map((key: string) => {
        return {
            field: key,
            headerName: toSentenceCase(key),
            editable: false,
            width: 120,
        }
    })

    const TargetService = schema.service.name == 'user' ? UserService : CoreService;

    const TargetAPI: ServiceAPI = {
        createItem: TargetService.CreateItem,
        getItem: TargetService.GetItem,
        getItems: TargetService.GetItems,
        getItemsForDropdown: TargetService.GetItemsForDropdown,
        editItem: TargetService.EditItem,
        deleteItem: TargetService.DeleteItem,
    };

    const TargetItemContentProps: ElementContentProps = {
        service: TargetAPI,
        tag: schema.base.schema_tag,
        tagTitle: schema.base.schema_title,
        columns: TargetListSchema,
    };

    const TargetEditFormProps: ElementEditFormProps = {
        name: schema.base.schema_title,
        type: 'Edit',
        schema: TargetFormSchema,
        data: TargetSchema,
        itemName: schema.base.schema_tag,
        submitData: TargetAPI.editItem,
        loadData: TargetAPI.getItem,
        loadDropdowns: schema.dropdowns ? 
            Object.entries(schema.dropdowns).map(dropdownField => {
                const svc = dropdownField[1].service == 'user' ? UserService : CoreService;
                return {
                    name: dropdownField[1].entity,
                    selector: (entity) => svc.GetItemsForDropdown(entity)
                }
            })
            : []
    }

    const TargetCreateFormProps: ElementEditFormProps = {
        ...TargetEditFormProps,
        type: 'Create',
        submitData: TargetAPI.createItem,
    }

    const TargetElementRoute = MakeElementRoute(
        `/${schema.nav_link.target}`,
        TargetItemContentProps,
        TargetCreateFormProps,
        TargetEditFormProps,
    );
    const TargetNavLink = schema.nav_link;

    return {
        schema: TargetSchema,
        elementRoute: TargetElementRoute,
        navLink: TargetNavLink
    };
};

export default { GetAllSchemas, GetSchema };
