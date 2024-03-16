import { ZodString, z } from 'zod';
import toSentenceCase from 'helpers/toSentenceCase';
import FormSchemaType, {
    ElementContentProps,
    ElementEditFormProps,
    ListSchema,
    ServiceAPI,
} from './types';
import UserService from 'services/user';

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
        if (entry[1] instanceof ZodString) {
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
};

const UserCreateFormProps: ElementEditFormProps = {
    ...UserEditFormProps,
    type: 'Create',
    submitData: UserAPI.createItem,
};

export default UserSchema;
export { UserItemContentProps, UserEditFormProps, UserCreateFormProps };
