import React, { useEffect, useState } from 'react';
import UserService from 'services/user';
import { UserFormSchema, UserListSchema } from 'schemas/user';
import DataTable from 'components/molecules/DataTable';
import DeleteConfirmationDialog from 'components/organisms/DeleteConfirmationDialog';

const Users = () => {
    const [userList, setUserList] = useState([]);
    const [deleteDialogOpen, toggleDeleteDialog] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: any[] = UserListSchema;

    const x = UserFormSchema;
    console.log(x);

    useEffect(() => {
        const getList = async () => {
            const res = await UserService.GetItems('users');
            setUserList(res);
        };
        getList();
    }, []);

    if (!userList) return <>N/A</>;

    return (
        <>
            <DataTable rows={userList} columns={columns} confirmDelete={() => toggleDeleteDialog(true)} />
            <DeleteConfirmationDialog 
                open={deleteDialogOpen}
                actionProps={{
                    positiveActionText: 'Yes',
                    negativeActionText: 'No',
                    positiveAction: () => toggleDeleteDialog(false),
                    negativeAction: () => toggleDeleteDialog(false)
                }}
            />
        </>
    );
};

export default Users;
