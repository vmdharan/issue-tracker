import React from 'react';
import { SCHEMA_TAG, SCHEMA_TAG_TITLE, UserAPI, UserListSchema } from 'schemas/user';
import ItemContent from 'components/organisms/ItemContent';

const Users = () => {
    return (
        <>
            <ItemContent
                service={UserAPI}
                tag={SCHEMA_TAG}
                tagTitle={SCHEMA_TAG_TITLE}
                columns={UserListSchema}
            />
        </>
    );
};

export default Users;
