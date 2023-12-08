import React from 'react';
import Box from 'components/atoms/Box';
import Button from 'components/atoms/Button';
import ActionDialog from 'components/molecules/ActionDialog';
import { DeleteConfirmationDialogProps } from './types';

const DeleteConfirmationDialog = (props: DeleteConfirmationDialogProps) => {
    const TITLE = props.title ?? 'Confirmation Dialog';
    const CONTENT = props.content ?? 'Are you sure you want to delete ?';

    const titleElement = <>{TITLE}</>;
    const contentElement = <>{CONTENT}</>;
    const actions = (
        <Box>
            <Button
                color="secondary"
                variant="outlined"
                onClick={props.actionProps.negativeAction}
            >
                {props.actionProps.negativeActionText}
            </Button>
            <Button
                color="primary"
                variant="contained"
                onClick={props.actionProps.positiveAction}
            >
                {props.actionProps.positiveActionText}
            </Button>
        </Box>
    );

    return (
        <ActionDialog
            open={props.open}
            title={titleElement}
            content={contentElement}
            actions={actions}
        />
    );
};

export default DeleteConfirmationDialog;
