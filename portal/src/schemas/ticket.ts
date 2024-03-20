import { ZodString, z } from 'zod';
import toSentenceCase from 'helpers/toSentenceCase';
import FormSchemaType, {
    ElementContentProps,
    ElementEditFormProps,
    ListSchema,
    ServiceAPI,
} from '../types/schema';
import CoreService from 'services/core';
import UserService from 'services/user';
import MakeElementRoute from '../routes/MakeElementRoute';

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
        if (entry[0] == 'creator') {
            return {
                name: entry[0],
                type: 'Select',
                checks: entry[1]?._def.checks.filter((f) => f != undefined),
                entity: 'users',
            };
        } else if (entry[0] == 'assignee') {
            return {
                name: entry[0],
                type: 'Select',
                checks: entry[1]?._def.checks.filter((f) => f != undefined),
                entity: 'users',
            };
        } else if (entry[0] == 'category') {
            return {
                name: entry[0],
                type: 'Select',
                checks: entry[1]?._def.checks.filter((f) => f != undefined),
                entity: 'ticket-categories',
            };
        } else if (entry[0] == 'severity') {
            return {
                name: entry[0],
                type: 'Select',
                checks: entry[1]?._def.checks.filter((f) => f != undefined),
                entity: 'ticket-severities',
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
    getItemsForDropdown: CoreService.GetItemsForDropdown,
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
    loadDropdowns: [
        { name: 'users', selector: () => UserService.GetItemsForDropdown('users') },
        {
            name: 'ticket-categories',
            selector: (entity) => CoreService.GetItemsForDropdown(entity),
        },
        {
            name: 'ticket-severities',
            selector: (entity) => CoreService.GetItemsForDropdown(entity),
        },
    ],
};

const TicketCreateFormProps: ElementEditFormProps = {
    ...TicketEditFormProps,
    type: 'Create',
    submitData: TicketAPI.createItem,
};

const TicketElementRoute = MakeElementRoute(
    '/tickets',
    TicketItemContentProps,
    TicketCreateFormProps,
    TicketEditFormProps,
);

const TicketNavLink = {
    target: 'tickets',
    label: 'Tickets',
    icon: 'assignment',
};

export default TicketSchema;
export { TicketElementRoute, TicketNavLink };
