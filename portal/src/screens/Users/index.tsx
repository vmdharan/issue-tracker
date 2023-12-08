import React, { useEffect, useState } from 'react';
import UserService from 'services/user';
import { UserFormSchema, UserListSchema } from 'schemas/user';
import DataTable from 'components/molecules/DataTable';
import DeleteConfirmationDialog from 'components/organisms/DeleteConfirmationDialog';
import Alert from 'components/atoms/Alert';

const Users = () => {
    const [userList, setUserList] = useState([]);
    const [deleteDialogOpen, toggleDeleteDialog] = useState(false);
    const tag = 'users';
    const tagTitle = 'Users';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: any[] = UserListSchema;

    const x = UserFormSchema;
    console.log(x);

    useEffect(() => {
        const getList = async () => {
            const res = await UserService.GetItems(tag);
            setUserList(res);
        };
        getList();
    }, []);

    if (!userList) return <>N/A</>;

    return (
        <>
            <h1>{tagTitle}</h1>
            <Alert severity="info" sx={{ margin: '8px 0' }}>
                Click <a href={`/${tag}/create`}>here</a> to create a new element.
            </Alert>
            <DataTable
                rows={userList}
                columns={columns}
                tag={tag}
                confirmDelete={() => toggleDeleteDialog(true)}
            />
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                actionProps={{
                    positiveActionText: 'Yes',
                    negativeActionText: 'No',
                    positiveAction: () => toggleDeleteDialog(false),
                    negativeAction: () => toggleDeleteDialog(false),
                }}
            />
        </>
    );
};

export default Users;
