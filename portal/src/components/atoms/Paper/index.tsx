import { PaperProps, Paper as MuiPaper } from '@mui/material';
import React from 'react';

const Paper: React.FC<PaperProps> = (props: PaperProps) => {
    return <MuiPaper {...props} />;
};

export default Paper;
