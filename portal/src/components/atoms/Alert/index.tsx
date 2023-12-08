import { AlertProps, Alert as MuiAlert } from '@mui/material';
import React from 'react';

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
    return <MuiAlert {...props} />;
};

export default Alert;
