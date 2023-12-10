import { ZodStringCheck } from "zod";

type FormSchemaType = {
    name: string;
    type: string;
    checks?: ZodStringCheck[];
};

export default FormSchemaType;