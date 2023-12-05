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
                                    <a href="#">Edit</a>
                                </TableCell>
                                <TableCell align="center">
                                    <a href="#">Delete</a>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
