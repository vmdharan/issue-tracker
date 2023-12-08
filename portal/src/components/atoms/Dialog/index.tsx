import { DialogProps, Dialog as MuiDialog } from '@mui/material';
import { DialogTitleProps, DialogTitle as MuiDialogTitle } from '@mui/material';
import {
    DialogActionsProps,
    DialogActions as MuiDialogActions,
} from '@mui/material';
import {
    DialogContentProps,
    DialogContent as MuiDialogContent,
} from '@mui/material';
import React from 'react';

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
    return <MuiDialog {...props}>{props.children}</MuiDialog>;
};

const DialogActions: React.FC<DialogActionsProps> = (props: DialogActionsProps) => {
    return <MuiDialogActions {...props}>{props.children}</MuiDialogActions>;
};

const DialogContent: React.FC<DialogContentProps> = (props: DialogContentProps) => {
    return <MuiDialogContent {...props}>{props.children}</MuiDialogContent>;
};

const DialogTitle: React.FC<DialogTitleProps> = (props: DialogTitleProps) => {
    return <MuiDialogTitle {...props}>{props.children}</MuiDialogTitle>;
};

export default Dialog;
export { DialogActions, DialogContent, DialogTitle };
