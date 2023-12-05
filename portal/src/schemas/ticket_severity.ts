import { z } from 'zod';

const TicketSeveritySchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
});

export default TicketSeveritySchema;
