/* eslint-disable @typescript-eslint/no-explicit-any */
import FormSchemaType, { DataSchema } from 'schemas/types';

type CreateEditFormPropsType = {
    data: DataSchema;
    schema: FormSchemaType[];
    type: FormVariant;
    name: string;
    itemName: string;
    submitData: (itemName: string, id: string, postBody: string) => Promise<any>;
    loadData: (itemName: string, id: string) => Promise<any>;
};

type FormVariant = 'Create' | 'Edit';

export type { CreateEditFormPropsType, FormVariant };
