import { z } from 'zod';

const UserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    userName: z.string(),
    password: z.string(),
    organisationCode: z.string()
});

export default UserSchema;