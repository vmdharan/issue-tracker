import React, { useEffect, useState } from 'react';
import CoreService from 'services/core';

const Users = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            const res = await CoreService.GetItems('users');
            setUserList(res);
        };
        getList();
    }, []);

    if (!userList) return <>N/A</>;
    console.log(userList);

    return <>Users</>;
};

export default Users;
