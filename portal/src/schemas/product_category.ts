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

const SCHEMA_TAG = 'product-categories';
const SCHEMA_TAG_TITLE = 'Product Category';

const ProductCategorySchema = z.object({
    code: z.string(),
    name: z.string().max(MAX_NAME_LENGTH),
    description: z.string().max(MAX_DESCRIPTION_LENGTH),
    parentCategoryCode: z.string(),
});

const ProductCategoryFormSchema: FormSchemaType[] = Object.entries(
    ProductCategorySchema.shape,
).map((entry) => {
    if (entry[0] == 'parentCategoryCode') {
        return {
            name: entry[0],
            type: 'Select',
            checks: entry[1]?._def.checks.filter((f) => f != undefined),
            entity: 'product-categories',
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
});

const ProductCategorySchemaSubset = ProductCategorySchema.omit({});
const ProductCategoryListSchema: ListSchema[] = Object.keys(
    ProductCategorySchemaSubset.keyof().Values,
).map((key: string) => {
    return {
        field: key,
        headerName: toSentenceCase(key),
        editable: false,
        width: 120,
    };
});

const ProductCategoryAPI: ServiceAPI = {
    createItem: CoreService.CreateItem,
    getItem: CoreService.GetItem,
    getItems: CoreService.GetItems,
    getItemsForDropdown: CoreService.GetItemsForDropdown,
    editItem: CoreService.EditItem,
    deleteItem: CoreService.DeleteItem,
};

const ProductCategoryItemContentProps: ElementContentProps = {
    service: ProductCategoryAPI,
    tag: SCHEMA_TAG,
    tagTitle: SCHEMA_TAG_TITLE,
    columns: ProductCategoryListSchema,
};

const ProductCategoryEditFormProps: ElementEditFormProps = {
    name: SCHEMA_TAG_TITLE,
    type: 'Edit',
    schema: ProductCategoryFormSchema,
    data: ProductCategorySchema,
    itemName: SCHEMA_TAG,
    submitData: ProductCategoryAPI.editItem,
    loadData: ProductCategoryAPI.getItem,
    loadDropdowns: [
        {
            name: 'product-categories',
            selector: (entity) => CoreService.GetItemsForDropdown(entity),
        },
    ],
};

const ProductCategoryCreateFormProps: ElementEditFormProps = {
    ...ProductCategoryEditFormProps,
    type: 'Create',
    submitData: ProductCategoryAPI.createItem,
};

const ProductCategoryElementRoute = MakeElementRoute(
    '/product-categories',
    ProductCategoryItemContentProps,
    ProductCategoryCreateFormProps,
    ProductCategoryEditFormProps,
);

const ProductCategoryNavLink = {
    target: 'product-categories',
    label: 'Product categories',
    icon: 'folder',
};

export default ProductCategorySchema;
export { ProductCategoryElementRoute, ProductCategoryNavLink };
