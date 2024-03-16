import React from 'react';
import Paper from 'components/atoms/Paper';
import Table, {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from 'components/atoms/Table';
import { DataTableProps } from './types';
import * as styles from './index.module.scss';
import Button from 'components/atoms/Button';

const DataTable = (props: DataTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }}>
                <TableHead sx={{ backgroundColor: 'black' }}>
                    <TableRow>
                        {props.columns &&
                            props.columns.map((column, i) => (
                                <TableCell
                                    key={i}
                                    align="center"
                                    sx={{ color: 'white' }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                        <TableCell align="center" sx={{ color: 'white' }}>
                            Edit?
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>
                            Delete?
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows &&
                        props.rows.map((row) => (
                            <TableRow
                                key={row._id}
                                className={styles['datatable-row']}
                            >
                                {props.columns.map((col, j) => (
                                    <TableCell key={j} align="center">
                                        {row[col.field]}
                                    </TableCell>
                                ))}
                                <TableCell align="center">
                                    <Button href={`/${props.tag}/edit/${row._id}`}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => props.confirmDelete(row._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
