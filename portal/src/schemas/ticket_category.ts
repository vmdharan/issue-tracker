import { ZodString, z } from 'zod';
import toSentenceCase from 'helpers/toSentenceCase';
import FormSchemaType, {
    ElementContentProps,
    ElementEditFormProps,
    ListSchema,
    ServiceAPI,
} from './types';
import CoreService from 'services/core';

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
    if (entry[1] instanceof ZodString) {
        return {
            name: entry[0],
            type: 'TextBox',
            checks: entry[1]?._def.checks.filter((f) => f != undefined),
        };
    }

    return {
        name: entry[0],
        type: 'TextBox',
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
};

const TicketCategoryCreateFormProps: ElementEditFormProps = {
    ...TicketCategoryEditFormProps,
    type: 'Create',
    submitData: TicketCategoryAPI.createItem,
};

export default TicketCategorySchema;
export {
    TicketCategoryItemContentProps,
    TicketCategoryEditFormProps,
    TicketCategoryCreateFormProps,
};
