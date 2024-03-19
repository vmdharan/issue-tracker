import { GridProps, Grid as MuiGrid } from '@mui/material';
import React from 'react';

const Grid: React.FC<GridProps> = (props: GridProps) => {
    return <MuiGrid {...props}>{props.children}</MuiGrid>;
};

export default Grid;
