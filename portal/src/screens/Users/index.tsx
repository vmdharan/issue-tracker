import React, { useEffect, useState } from 'react';
import UserService from 'services/user';

const Users = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            const res = await UserService.GetItems('users');
            setUserList(res);
        };
        getList();
    }, []);

    if (!userList) return <>N/A</>;
    console.log(userList);

    return <>Users</>;
};

export default Users;
