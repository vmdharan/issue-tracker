import { IconProps, Icon as MuiIcon } from '@mui/material';
import React from 'react';

const Icon: React.FC<IconProps> = (props: IconProps) => {
    return <MuiIcon {...props} />;
};

export default Icon;
