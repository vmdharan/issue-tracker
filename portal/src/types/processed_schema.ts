import { ZodObject, ZodTypeAny } from "zod";
import { JsonSchemaNavLink } from "./json_schema";

type ProcessedSchema = {
    schema: ZodObject<{}, "strip", ZodTypeAny, {}, {}>;
    elementRoute: {
        path: string;
        errorElement: React.JSX.Element;
        children: {
            path: string;
            element: React.JSX.Element;
        }[];
    };
    navLink: JsonSchemaNavLink;
};

export default ProcessedSchema;