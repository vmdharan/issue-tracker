import { z } from 'zod';

const ProductCategorySchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    parentCategoryCode: z.string(),
});

export default ProductCategorySchema;
