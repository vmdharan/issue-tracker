import { ZodString, z } from 'zod';
import toSentenceCase from 'helpers/toSentenceCase';
import FormSchemaType, {
    ElementContentProps,
    ElementEditFormProps,
    ListSchema,
    ServiceAPI,
} from './types';
import CoreService from 'services/core';

const MAX_TITLE_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 256;

const SCHEMA_TAG = 'tickets';
const SCHEMA_TAG_TITLE = 'Ticket';

const TicketSchema = z.object({
    code: z.string(),
    title: z.string().max(MAX_TITLE_LENGTH),
    description: z.string().max(MAX_DESCRIPTION_LENGTH),
    creator: z.string(),
    assignee: z.string(),
    category: z.string(),
    severity: z.string(),
});

const TicketFormSchema: FormSchemaType[] = Object.entries(TicketSchema.shape).map(
    (entry) => {
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
    },
);

const TicketSchemaSubset = TicketSchema.omit({});
const TicketListSchema: ListSchema[] = Object.keys(
    TicketSchemaSubset.keyof().Values,
).map((key: string) => {
    return {
        field: key,
        headerName: toSentenceCase(key),
        editable: false,
        width: 120,
    };
});

const TicketAPI: ServiceAPI = {
    createItem: CoreService.CreateItem,
    getItem: CoreService.GetItem,
    getItems: CoreService.GetItems,
    editItem: CoreService.EditItem,
    deleteItem: CoreService.DeleteItem,
};

const TicketItemContentProps: ElementContentProps = {
    service: TicketAPI,
    tag: SCHEMA_TAG,
    tagTitle: SCHEMA_TAG_TITLE,
    columns: TicketListSchema,
};

const TicketEditFormProps: ElementEditFormProps = {
    name: SCHEMA_TAG_TITLE,
    type: 'Edit',
    schema: TicketFormSchema,
    data: TicketSchema,
    itemName: SCHEMA_TAG,
    submitData: TicketAPI.editItem,
    loadData: TicketAPI.getItem,
};

const TicketCreateFormProps: ElementEditFormProps = {
    ...TicketEditFormProps,
    type: 'Create',
    submitData: TicketAPI.createItem,
};

export default TicketSchema;
export { TicketItemContentProps, TicketEditFormProps, TicketCreateFormProps };
