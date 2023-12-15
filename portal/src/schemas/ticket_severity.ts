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

const SCHEMA_TAG = 'ticket-severities';
const SCHEMA_TAG_TITLE = 'Ticket Severity';

const TicketSeveritySchema = z.object({
    code: z.string(),
    name: z.string().max(MAX_NAME_LENGTH),
    description: z.string().max(MAX_DESCRIPTION_LENGTH),
});

const TicketSeverityFormSchema: FormSchemaType[] = Object.entries(
    TicketSeveritySchema.shape,
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

const TicketSeveritySchemaSubset = TicketSeveritySchema.omit({});
const TicketSeverityListSchema: ListSchema[] = Object.keys(
    TicketSeveritySchemaSubset.keyof().Values,
).map((key: string) => {
    return {
        field: key,
        headerName: toSentenceCase(key),
        editable: false,
        width: 120,
    };
});

const TicketSeverityAPI: ServiceAPI = {
    createItem: CoreService.CreateItem,
    getItem: CoreService.GetItem,
    getItems: CoreService.GetItems,
    editItem: CoreService.EditItem,
    deleteItem: CoreService.DeleteItem,
};

const TicketSeverityItemContentProps: ElementContentProps = {
    service: TicketSeverityAPI,
    tag: SCHEMA_TAG,
    tagTitle: SCHEMA_TAG_TITLE,
    columns: TicketSeverityListSchema,
};

const TicketSeverityEditFormProps: ElementEditFormProps = {
    name: SCHEMA_TAG_TITLE,
    type: 'Edit',
    schema: TicketSeverityFormSchema,
    data: TicketSeveritySchema,
    itemName: SCHEMA_TAG,
    submitData: TicketSeverityAPI.editItem,
    loadData: TicketSeverityAPI.getItem,
};

const TicketSeverityCreateFormProps: ElementEditFormProps = {
    ...TicketSeverityEditFormProps,
    type: 'Create',
    submitData: TicketSeverityAPI.createItem,
};

export default TicketSeveritySchema;
export {
    TicketSeverityItemContentProps,
    TicketSeverityEditFormProps,
    TicketSeverityCreateFormProps,
};
