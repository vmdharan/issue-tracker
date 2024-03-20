/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodStringCheck } from 'zod';
import UserSchema from '../schemas/user';
import type { FormVariant } from '~/components/organisms/CreateEditForm/types';
import TicketSeveritySchema from '../schemas/ticket_severity';
import TicketCategorySchema from '../schemas/ticket_category';
import TicketSchema from '../schemas/ticket';
import OrganisationSchema from '../schemas/organisation';
import ProductSchema from '../schemas/product';
import ProductCategorySchema from '../schemas/product_category';

type FormSchemaType = {
    name: string;
    type: string;
    checks?: ZodStringCheck[];
    entity?: string;
};

type ServiceAPI = {
    createItem: (itemName: string, id: string, postBody: string) => Promise<any>;
    getItem: (itemName: string, id: string) => Promise<any>;
    getItems: (itemName: string) => Promise<any>;
    getItemsForDropdown: (itemName: string) => Promise<any>;
    editItem: (itemName: string, id: string, postBody: string) => Promise<any>;
    deleteItem: (itemName: string, id: string) => Promise<any>;
};

type DataSchema =
    | typeof UserSchema
    | typeof TicketSeveritySchema
    | typeof TicketCategorySchema
    | typeof TicketSchema
    | typeof OrganisationSchema
    | typeof ProductSchema
    | typeof ProductCategorySchema;

type ListSchema = {
    field: string;
    headerName: string;
    editable: boolean;
    width: number;
};

type ElementContentProps = {
    service: ServiceAPI;
    tag: string;
    tagTitle: string;
    columns: ListSchema[];
};

type ElementEditFormDropdownProps = {
    name: string;
    selector: (itemName: string) => Promise<any>;
};

type ElementEditFormProps = {
    name: string;
    type: FormVariant;
    schema: FormSchemaType[];
    data: DataSchema;
    itemName: string;
    submitData: (itemName: string, id: string, postBody: string) => Promise<any>;
    loadData: (itemName: string, id: string) => Promise<any>;
    loadDropdowns?: ElementEditFormDropdownProps[];
};

export default FormSchemaType;
export type {
    DataSchema,
    ServiceAPI,
    ListSchema,
    ElementContentProps,
    ElementEditFormProps,
    ElementEditFormDropdownProps,
};
