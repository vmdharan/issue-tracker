import React from "react";
import { CreateEditFormPropsType } from "./types";
import Button from "components/atoms/Button";
import Box from "components/atoms/Box"
import TextField from "components/atoms/TextField"

const CreateEditForm = (props: CreateEditFormPropsType) => {
    const title = `${props.type} ${props.name}`;
    return (
        <Box sx={{width: '480px'}}>
            <h1>{title}</h1>
            {props && props.schema.map(s => {
                if (s.type == 'TextBox') {
                    return (<TextField label={s.name} name={s.name} fullWidth sx={{margin: '8px', display: 'block'}} />);
                }

                return (<TextField label={s.name} name={s.name} />);
            })}

            <Button variant='contained' color='primary' sx={{margin: '8px'}}>Submit</Button>
        </Box>
    );
};

export default CreateEditForm;