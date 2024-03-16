import { MenuItemProps, MenuItem as MuiMenuItem } from '@mui/material';
import React from 'react';

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    return <MuiMenuItem {...props} />;
};

export default MenuItem;
