import React, { useState } from "react";
import Box from "components/atoms/Box";
import Button from "components/atoms/Button";
import ActionDialog from "components/molecules/ActionDialog";
import { DeleteConfirmationDialogProps } from "./types";

const DeleteConfirmationDialog = (props: DeleteConfirmationDialogProps) => {
    const title = (<>Confirmation Dialog</>);
    const content = (<>Are you sure you want to delete ?</>);
    const actions = (
        <Box>
            <Button color="secondary" variant="outlined" onClick={props.actionProps.negativeAction}>{props.actionProps.negativeActionText}</Button>
            <Button color="primary" variant="contained" onClick={props.actionProps.positiveAction}>{props.actionProps.positiveActionText}</Button>
        </Box>
    );

    return (
        <ActionDialog open={props.open} title={title} content={content} actions={actions} />
    );
};

export default DeleteConfirmationDialog;