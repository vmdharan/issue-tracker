import React, { useEffect, useState } from 'react';
import UserService from 'services/user';
import { UserListSchema } from 'schemas/user';
import DataTable from 'components/molecules/DataTable';

const Users = () => {
    const [userList, setUserList] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: any[] = UserListSchema;

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
            <DataTable rows={userList} columns={columns} />
        </>
    );
};

export default Users;
