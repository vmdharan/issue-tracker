import { z } from 'zod';

const OrganisationSchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
});

export default OrganisationSchema;
