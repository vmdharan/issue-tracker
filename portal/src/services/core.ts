import { HOST_URI } from './config';

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

const CreateItem = async (itemName: string) => {
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

export default {
    GetItem,
    GetItems,
    CreateItem,
    EditItem,
    DeleteItem,
};
