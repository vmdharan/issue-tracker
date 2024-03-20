import React from 'react';
import ErrorPage from 'components/pages/ErrorPage';
import CreateEditForm from 'components/organisms/CreateEditForm';
import ItemContent from 'components/organisms/ItemContent';
import { ElementContentProps, ElementEditFormProps } from '../../types/schema';

const MakeElementRoute = (
    elementPath: string,
    contentProps: ElementContentProps | null,
    createFormProps: ElementEditFormProps | null,
    editFormProps: ElementEditFormProps | null,
) => {
    return {
        path: elementPath,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: contentProps ? (
                    <ItemContent {...contentProps} />
                ) : (
                    <ErrorPage />
                ),
            },
            {
                path: 'create',
                element: createFormProps ? (
                    <CreateEditForm {...createFormProps} />
                ) : (
                    <ErrorPage />
                ),
            },
            {
                path: 'edit/:id',
                element: editFormProps ? (
                    <CreateEditForm {...editFormProps} />
                ) : (
                    <ErrorPage />
                ),
            },
        ],
    };
};

export default MakeElementRoute;
