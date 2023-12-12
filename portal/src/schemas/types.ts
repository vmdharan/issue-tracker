import { ZodStringCheck } from "zod";
import UserSchema from "./user";

type FormSchemaType = {
    name: string;
    type: string;
    checks?: ZodStringCheck[];
};

type DataSchema = typeof UserSchema;

export default FormSchemaType;
export { DataSchema };