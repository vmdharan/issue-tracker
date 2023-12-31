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

const SCHEMA_TAG = 'products';
const SCHEMA_TAG_TITLE = 'Product';

const ProductSchema = z.object({
    code: z.string(),
    name: z.string().max(MAX_NAME_LENGTH),
    description: z.string().max(MAX_DESCRIPTION_LENGTH),
    productCategory: z.string(),
});

const ProductFormSchema: FormSchemaType[] = Object.entries(ProductSchema.shape).map(
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

const ProductSchemaSubset = ProductSchema.omit({});
const ProductListSchema: ListSchema[] = Object.keys(
    ProductSchemaSubset.keyof().Values,
).map((key: string) => {
    return {
        field: key,
        headerName: toSentenceCase(key),
        editable: false,
        width: 120,
    };
});

const ProductAPI: ServiceAPI = {
    createItem: CoreService.CreateItem,
    getItem: CoreService.GetItem,
    getItems: CoreService.GetItems,
    editItem: CoreService.EditItem,
    deleteItem: CoreService.DeleteItem,
};

const ProductItemContentProps: ElementContentProps = {
    service: ProductAPI,
    tag: SCHEMA_TAG,
    tagTitle: SCHEMA_TAG_TITLE,
    columns: ProductListSchema,
};

const ProductEditFormProps: ElementEditFormProps = {
    name: SCHEMA_TAG_TITLE,
    type: 'Edit',
    schema: ProductFormSchema,
    data: ProductSchema,
    itemName: SCHEMA_TAG,
    submitData: ProductAPI.editItem,
    loadData: ProductAPI.getItem,
};

const ProductCreateFormProps: ElementEditFormProps = {
    ...ProductEditFormProps,
    type: 'Create',
    submitData: ProductAPI.createItem,
};

export default ProductSchema;
export { ProductItemContentProps, ProductEditFormProps, ProductCreateFormProps };
