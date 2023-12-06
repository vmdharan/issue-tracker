import { BoxProps, Box as MuiBox } from '@mui/material';
import React from 'react';

const Box: React.FC<BoxProps> = (props: BoxProps) => {
    return <MuiBox {...props}>{props.children}</MuiBox>;
};

export default Box;
