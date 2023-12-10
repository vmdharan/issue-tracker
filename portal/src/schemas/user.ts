import { ZodString, z } from 'zod';
import toSentenceCase from 'helpers/toSentenceCase';
import FormSchemaType from './types';

const MAX_NAME_LENGTH = 32;
const MAX_EMAIL_LENGTH = 64;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 16;

const UserSchema = z.object({
    firstName: z.string().max(MAX_NAME_LENGTH),
    lastName: z.string().max(MAX_NAME_LENGTH),
    email: z.string().max(MAX_EMAIL_LENGTH).email(),
    userName: z.string().max(MAX_NAME_LENGTH),
    password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
    organisationCode: z.string(),
});

const UserFormSchema: FormSchemaType[] = Object.entries(UserSchema.shape).map((entry) => {
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

const UserSchemaSubset = UserSchema.omit({ password: true });
const UserListSchema = Object.keys(UserSchemaSubset.keyof().Values).map(
    (key: string) => {
        return {
            field: key,
            headerName: toSentenceCase(key),
            editable: false,
            width: 120,
        };
    },
);

export default UserSchema;
export { UserFormSchema, UserListSchema };
