import { z } from 'zod';

const ProductSchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    productCategoryCode: z.string(),
});

export default ProductSchema;
