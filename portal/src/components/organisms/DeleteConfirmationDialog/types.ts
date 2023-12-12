import { ActionDialogActionsProps } from '~/components/molecules/ActionDialog/types';

type DeleteConfirmationDialogProps = {
    open: boolean;
    title?: string;
    content?: string;
    id: string;
    actionProps: ActionDialogActionsProps;
};

export type { DeleteConfirmationDialogProps };
