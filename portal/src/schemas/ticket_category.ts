import { z } from 'zod';

const TicketCategorySchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    parentCategoryCode: z.string(),
});

export default TicketCategorySchema;
