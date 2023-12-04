import { TextFieldProps, TextField as MuiTextField } from '@mui/material';
import React from 'react';

const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
    return (
        <MuiTextField {...props} />
    );
};

export default TextField;