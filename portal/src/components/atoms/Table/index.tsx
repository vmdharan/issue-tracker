import { TableProps, Table as MuiTable } from '@mui/material';
import { TableBodyProps, TableBody as MuiTableBody } from '@mui/material';
import { TableCellProps, TableCell as MuiTableCell } from '@mui/material';
import {
    TableContainerProps,
    TableContainer as MuiTableContainer,
} from '@mui/material';
import { TableHeadProps, TableHead as MuiTableHead } from '@mui/material';
import { TableRowProps, TableRow as MuiTableRow } from '@mui/material';
import React from 'react';

const Table: React.FC<TableProps> = (props: TableProps) => {
    return <MuiTable {...props}>{props.children}</MuiTable>;
};

const TableBody: React.FC<TableBodyProps> = (props: TableBodyProps) => {
    return <MuiTableBody {...props}>{props.children}</MuiTableBody>;
};

const TableHead: React.FC<TableHeadProps> = (props: TableHeadProps) => {
    return <MuiTableHead {...props}>{props.children}</MuiTableHead>;
};

const TableContainer: React.FC<TableContainerProps> = (
    props: TableContainerProps,
) => {
    return <MuiTableContainer {...props}>{props.children}</MuiTableContainer>;
};

const TableCell: React.FC<TableCellProps> = (props: TableCellProps) => {
    return <MuiTableCell {...props}>{props.children}</MuiTableCell>;
};

const TableRow: React.FC<TableRowProps> = (props: TableRowProps) => {
    return <MuiTableRow {...props}>{props.children}</MuiTableRow>;
};

export default Table;
export { TableBody, TableCell, TableContainer, TableHead, TableRow };
