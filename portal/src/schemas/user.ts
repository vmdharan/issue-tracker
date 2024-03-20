import { ZodString, z } from 'zod';
import toSentenceCase from 'helpers/toSentenceCase';
import FormSchemaType, {
    ElementContentProps,
    ElementEditFormProps,
    ListSchema,
    ServiceAPI,
} from '../types/schema';
import UserService from 'services/user';
import CoreService from 'services/core';
import MakeElementRoute from '../routes/MakeElementRoute';

const MAX_NAME_LENGTH = 32;
const MAX_EMAIL_LENGTH = 64;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 16;

const SCHEMA_TAG = 'users';
const SCHEMA_TAG_TITLE = 'User';

const UserSchema = z.object({
    firstName: z.string().max(MAX_NAME_LENGTH),
    lastName: z.string().max(MAX_NAME_LENGTH),
    email: z.string().max(MAX_EMAIL_LENGTH).email(),
    userName: z.string().max(MAX_NAME_LENGTH),
    password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
    organisationCode: z.string(),
});

const UserFormSchema: FormSchemaType[] = Object.entries(UserSchema.shape).map(
    (entry) => {
        if (entry[0] == 'organisationCode') {
            return {
                name: entry[0],
                type: 'Select',
                checks: entry[1]?._def.checks.filter((f) => f != undefined),
                entity: 'organisations',
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

const UserSchemaSubset = UserSchema.omit({ password: true });
const UserListSchema: ListSchema[] = Object.keys(
    UserSchemaSubset.keyof().Values,
).map((key: string) => {
    return {
        field: key,
        headerName: toSentenceCase(key),
        editable: false,
        width: 120,
    };
});

const UserAPI: ServiceAPI = {
    createItem: UserService.CreateItem,
    getItem: UserService.GetItem,
    getItems: UserService.GetItems,
    getItemsForDropdown: UserService.GetItemsForDropdown,
    editItem: UserService.EditItem,
    deleteItem: UserService.DeleteItem,
};

const UserItemContentProps: ElementContentProps = {
    service: UserAPI,
    tag: SCHEMA_TAG,
    tagTitle: SCHEMA_TAG_TITLE,
    columns: UserListSchema,
};

const UserEditFormProps: ElementEditFormProps = {
    name: SCHEMA_TAG_TITLE,
    type: 'Edit',
    schema: UserFormSchema,
    data: UserSchema,
    itemName: SCHEMA_TAG,
    submitData: UserAPI.editItem,
    loadData: UserAPI.getItem,
    loadDropdowns: [
        {
            name: 'organisations',
            selector: (entity) => CoreService.GetItemsForDropdown(entity),
        },
    ],
};

const UserCreateFormProps: ElementEditFormProps = {
    ...UserEditFormProps,
    type: 'Create',
    submitData: UserAPI.createItem,
};

const UserElementRoute = MakeElementRoute(
    '/users',
    UserItemContentProps,
    UserCreateFormProps,
    UserEditFormProps,
);

const UserNavLink = {
    target: 'users',
    label: 'Users',
    icon: 'people',
};

export default UserSchema;
export { UserElementRoute, UserNavLink };
