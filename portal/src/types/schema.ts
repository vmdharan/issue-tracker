/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject, ZodStringCheck, ZodTypeAny } from 'zod';
import type { FormVariant } from '~/components/organisms/CreateEditForm/types';

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

type DataSchema = ZodObject<{}, "strip", ZodTypeAny, {}, {}>;

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
