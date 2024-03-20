import React, { useEffect, useState } from 'react';
import DataTable from 'components/molecules/DataTable';
import DeleteConfirmationDialog from 'components/organisms/DeleteConfirmationDialog';
import Alert from 'components/atoms/Alert';
import { useNavigate } from 'react-router-dom';
import ItemContentProps from './types';
import Box from 'components/atoms/Box';
import Typography from 'components/atoms/Typography';

import * as styles from './index.module.scss';

const ItemContent = (props: ItemContentProps) => {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [deleteDialogOpen, toggleDeleteDialog] = useState(false);

    useEffect(() => {
        const getList = async () => {
            const res = await props.service.getItems(props.tag);
            setItemList(res);
        };
        getList();
    }, [props.tag]);

    const handleDelete = async (id: string) => {
        const res = await props.service.deleteItem(props.tag, id);
        if (res?.success) {
            console.log(res);
            toggleDeleteDialog(false);
            setDeleteId('');
            navigate(0);
        } else {
            console.log(res);
        }
    };

    if (!itemList) return <>N/A</>;

    return (
        <>
            <Box className={styles['content']}>
                <Typography variant="h4" component="h1">
                    {props.tagTitle}
                </Typography>
                <Alert severity="info" sx={{ margin: '8px 0' }}>
                    Click <a href={`/${props.tag}/create`}>here</a> to create a new
                    element.
                </Alert>
                <DataTable
                    rows={itemList}
                    columns={props.columns}
                    tag={props.tag}
                    confirmDelete={(id: string) => {
                        setDeleteId(id);
                        toggleDeleteDialog(true);
                    }}
                />
                <DeleteConfirmationDialog
                    open={deleteDialogOpen}
                    id={deleteId}
                    actionProps={{
                        positiveActionText: 'Yes',
                        negativeActionText: 'No',
                        positiveAction: handleDelete,
                        negativeAction: () => toggleDeleteDialog(false),
                    }}
                />
            </Box>
        </>
    );
};

export default ItemContent;
