import React from "react";
import Dialog, { DialogActions, DialogContent, DialogTitle } from "components/atoms/Dialog";
import { ActionDialogProps } from "./types";

const ActionDialog = ({open, title, content, actions}: ActionDialogProps) => {
    return (
        <>
            <Dialog open={open}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions>{actions}</DialogActions>
            </Dialog>
        </>
    )
};

export default ActionDialog;