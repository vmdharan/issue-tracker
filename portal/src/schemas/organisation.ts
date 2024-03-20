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

const SCHEMA_TAG = 'organisations';
const SCHEMA_TAG_TITLE = 'Organisation';

const OrganisationSchema = z.object({
    code: z.string(),
    name: z.string().max(MAX_NAME_LENGTH),
    description: z.string().max(MAX_DESCRIPTION_LENGTH),
});

const OrganisationFormSchema: FormSchemaType[] = Object.entries(
    OrganisationSchema.shape,
).map((entry) => {
    if (
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

const OrganisationSchemaSubset = OrganisationSchema.omit({});
const OrganisationListSchema: ListSchema[] = Object.keys(
    OrganisationSchemaSubset.keyof().Values,
).map((key: string) => {
    return {
        field: key,
        headerName: toSentenceCase(key),
        editable: false,
        width: 120,
    };
});

const OrganisationAPI: ServiceAPI = {
    createItem: CoreService.CreateItem,
    getItem: CoreService.GetItem,
    getItems: CoreService.GetItems,
    getItemsForDropdown: CoreService.GetItemsForDropdown,
    editItem: CoreService.EditItem,
    deleteItem: CoreService.DeleteItem,
};

const OrganisationItemContentProps: ElementContentProps = {
    service: OrganisationAPI,
    tag: SCHEMA_TAG,
    tagTitle: SCHEMA_TAG_TITLE,
    columns: OrganisationListSchema,
};

const OrganisationEditFormProps: ElementEditFormProps = {
    name: SCHEMA_TAG_TITLE,
    type: 'Edit',
    schema: OrganisationFormSchema,
    data: OrganisationSchema,
    itemName: SCHEMA_TAG,
    submitData: OrganisationAPI.editItem,
    loadData: OrganisationAPI.getItem,
};

const OrganisationCreateFormProps: ElementEditFormProps = {
    ...OrganisationEditFormProps,
    type: 'Create',
    submitData: OrganisationAPI.createItem,
};

const OrganisationElementRoute = MakeElementRoute(
    '/organisations',
    OrganisationItemContentProps,
    OrganisationCreateFormProps,
    OrganisationEditFormProps,
);

export default OrganisationSchema;
export { OrganisationElementRoute };
