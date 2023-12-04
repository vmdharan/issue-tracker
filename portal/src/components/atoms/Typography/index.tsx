import { TypographyProps, Typography as MuiTypography } from '@mui/material';
import React from 'react';

const Typography: React.FC<TypographyProps> = (props: TypographyProps) => {
    return (
        <MuiTypography {...props}>
            {props.children}
        </MuiTypography>
    );
};

export default Typography;