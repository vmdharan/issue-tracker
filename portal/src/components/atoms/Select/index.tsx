import { SelectProps, Select as MuiSelect } from '@mui/material';
import React from 'react';

const Select: React.FC<SelectProps> = (props: SelectProps) => {
    return <MuiSelect {...props} />;
};

export default Select;
