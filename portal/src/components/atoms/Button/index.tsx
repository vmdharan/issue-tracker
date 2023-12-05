import { ButtonProps, Button as MuiButton } from '@mui/material';
import React from 'react';

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return <MuiButton {...props}>{props.children}</MuiButton>;
};

export default Button;
