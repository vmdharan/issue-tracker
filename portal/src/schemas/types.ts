/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodStringCheck } from 'zod';
import UserSchema from './user';

type FormSchemaType = {
    name: string;
    type: string;
    checks?: ZodStringCheck[];
};

type ServiceAPI = {
    createItem: (itemName: string, id: string, postBody: string) => Promise<any>;
    getItem: (itemName: string, id: string) => Promise<any>;
    getItems: (itemName: string) => Promise<any>;
    editItem: (itemName: string, id: string, postBody: string) => Promise<any>;
    deleteItem: (itemName: string, id: string) => Promise<any>;
};

type DataSchema = typeof UserSchema;

export default FormSchemaType;
export type { DataSchema, ServiceAPI };
