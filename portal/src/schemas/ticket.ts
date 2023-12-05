import { z } from 'zod';

const TicketSchema = z.object({
    code: z.string(),
    title: z.string(),
    description: z.string(),
    creator: z.string(),
    assignee: z.string(),
    category: z.string(),
    severity: z.string()
});

export default TicketSchema;