import FormSchemaType from "~/schemas/types";

type CreateEditFormPropsType = {
    schema: FormSchemaType[];
    type: FormVariant;
    name: string;
    onSubmit: () => void;
};

type FormVariant = 'Create' | 'Edit';

export type { CreateEditFormPropsType };