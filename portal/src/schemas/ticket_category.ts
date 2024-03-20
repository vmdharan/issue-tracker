import { ZodString, z } from 'zod';
import toSentenceCase from 'helpers/toSentenceCase';
import FormSchemaType, {
    ElementContentProps,
    ElementEditFormProps,
    ListSchema,
    ServiceAPI,
} from '../types/schema';
import CoreService from 'services/core';
import MakeElementRoute from '../routes/MakeElementRoute';

const MAX_NAME_LENGTH = 32;
const MAX_DESCRIPTION_LENGTH = 128;

const SCHEMA_TAG = 'ticket-categories';
const SCHEMA_TAG_TITLE = 'Ticket Category';

const TicketCategorySchema = z.object({
    code: z.string(),
    name: z.string().max(MAX_NAME_LENGTH),
    description: z.string().max(MAX_DESCRIPTION_LENGTH),
    parentCategoryCode: z.string(),
});

const TicketCategoryFormSchema: FormSchemaType[] = Object.entries(
    TicketCategorySchema.shape,
).map((entry) => {
    if (entry[0] == 'parentCategoryCode') {
        return {
            name: entry[0],
            type: 'Select',
            checks: entry[1]?._def.checks.filter((f) => f != undefined),
            entity: 'ticket-categories',
        };
    } else if (
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

const TicketCategorySchemaSubset = TicketCategorySchema.omit({});
const TicketCategoryListSchema: ListSchema[] = Object.keys(
    TicketCategorySchemaSubset.keyof().Values,
).map((key: string) => {
    return {
        field: key,
        headerName: toSentenceCase(key),
        editable: false,
        width: 120,
    };
});

const TicketCategoryAPI: ServiceAPI = {
    createItem: CoreService.CreateItem,
    getItem: CoreService.GetItem,
    getItems: CoreService.GetItems,
    getItemsForDropdown: CoreService.GetItemsForDropdown,
    editItem: CoreService.EditItem,
    deleteItem: CoreService.DeleteItem,
};

const TicketCategoryItemContentProps: ElementContentProps = {
    service: TicketCategoryAPI,
    tag: SCHEMA_TAG,
    tagTitle: SCHEMA_TAG_TITLE,
    columns: TicketCategoryListSchema,
};

const TicketCategoryEditFormProps: ElementEditFormProps = {
    name: SCHEMA_TAG_TITLE,
    type: 'Edit',
    schema: TicketCategoryFormSchema,
    data: TicketCategorySchema,
    itemName: SCHEMA_TAG,
    submitData: TicketCategoryAPI.editItem,
    loadData: TicketCategoryAPI.getItem,
    loadDropdowns: [
        {
            name: 'ticket-categories',
            selector: (entity) => CoreService.GetItemsForDropdown(entity),
        },
    ],
};

const TicketCategoryCreateFormProps: ElementEditFormProps = {
    ...TicketCategoryEditFormProps,
    type: 'Create',
    submitData: TicketCategoryAPI.createItem,
};

const TicketCategoryElementRoute = MakeElementRoute(
    '/ticket-categories',
    TicketCategoryItemContentProps,
    TicketCategoryCreateFormProps,
    TicketCategoryEditFormProps,
);

const TicketCategoryNavLink = {
    target: 'ticket-categories',
    label: 'Ticket categories',
    icon: 'category',
};

export default TicketCategorySchema;
export { TicketCategoryElementRoute, TicketCategoryNavLink };
