import { USER_HOST_URI as HOST_URI } from './config';
import { LoginUserType } from './types';

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

const CreateItem = async (itemName: string, postBody: string) => {
    const postRequest = (postBody: string) => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: postBody }),
    });
    const postResult = await fetch(HOST_URI + itemName + '/create', postRequest('1'))
        .then((res) => res.json())
        .catch((err) => console.log(err));

    return postResult;
};

const EditItem = async (itemName: string) => {
    const putRequest = (postBody: string) => ({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: postBody }),
    });
    const putResult = await fetch(HOST_URI + itemName + '/edit', putRequest('1'))
        .then((res) => res.json())
        .catch((err) => console.log(err));

    return putResult;
};

const DeleteItem = async (itemName: string, id: string) => {
    const deleteResult = await fetch(HOST_URI + itemName + '/delete/' + id, {
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
    CreateItem,
    EditItem,
    DeleteItem,
    LoginUser,
};
