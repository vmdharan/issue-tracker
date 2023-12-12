import { ReactNode } from 'react';

type ActionDialogProps = {
    open: boolean;
    title: ReactNode;
    content: ReactNode;
    actions: ReactNode;
};

type ActionDialogActionsProps = {
    positiveAction: (id: string) => void;
    negativeAction: () => void;
    positiveActionText: string;
    negativeActionText: string;
};

export type { ActionDialogProps, ActionDialogActionsProps };
