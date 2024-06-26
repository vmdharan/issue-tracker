import { USER_HOST_URI as HOST_URI } from '../config/default';
import { LoginUserType } from '../types/login';

const GetItem = async (itemName: string, id: string) => {
    const response = await fetch(HOST_URI + itemName + '/' + id)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });

    return response;
};

const GetItems = async (itemName: string) => {
    const response = await fetch(HOST_URI + itemName)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });

    return response;
};

const GetItemsForDropdown = async (itemName: string) => {
    const response = await fetch(HOST_URI + itemName + '/dd')
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });

    return response;
};

const CreateItem = async (itemName: string, id: string, postBody: string) => {
    const postRequest = (postBody: string) => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: postBody,
    });
    const postResult = await fetch(HOST_URI + itemName + '/', postRequest(postBody))
        .then((res) => res.json())
        .catch((err) => console.log(err));

    return postResult;
};

const EditItem = async (itemName: string, id: string, postBody: string) => {
    const putRequest = (postBody: string) => ({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: postBody,
    });
    const putResult = await fetch(
        HOST_URI + itemName + '/' + id,
        putRequest(postBody),
    )
        .then((res) => res.json())
        .catch((err) => console.log(err));

    return putResult;
};

const DeleteItem = async (itemName: string, id: string) => {
    const deleteResult = await fetch(HOST_URI + itemName + '/' + id, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));

    return deleteResult;
};

const LoginUser = async (credentials: LoginUserType) => {
    const postRequest = (postBody: LoginUserType) => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody),
    });
    const postResult = await fetch(HOST_URI + 'login', postRequest(credentials))
        .then((res) => res.json())
        .catch((err) => console.log(err));

    return postResult;
};

export default {
    GetItem,
    GetItems,
    GetItemsForDropdown,
    CreateItem,
    EditItem,
    DeleteItem,
    LoginUser,
};
