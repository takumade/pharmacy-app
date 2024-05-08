'use client';

import * as React from 'react';
import { Grid, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Eye, Trash } from '@phosphor-icons/react';
import { PencilSimple } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';

import { Permissions, RolePerm } from '@/types/permissions';
import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}

export interface Transaction {
  _id: string;
  transactionId: string;
  orderId: string;
  userId: string;
  pharmacyId: string;
  amount: number;
  timestamp: string; // Assuming the timestamp is represented as a string
  status: string;
  responseCode: string;
  responseMessage: string;
  paymentGateway: string;
  data: string;
  __v: number;
};


interface GeneralTableProps {
  count?: number;
  page?: number;
  rows?: Transaction[];
  rowsPerPage?: number;
  permissions: RolePerm;
}

export function TransactionsTable({ count = 0, rows = [], permissions }: GeneralTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((txn) => txn._id);
  }, [rows]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function applyPagination(rows: Transaction[], page: number, rowsPerPage: number): Transaction[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const onPageChange = (event: React.MouseEvent | null, page: number) => {
    fetch(`${process.env.CLIENT_URI}?page=${page}`);
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Transaction ID</TableCell>
        <TableCell>Order ID</TableCell>
        <TableCell>User ID</TableCell>
        <TableCell>Pharmacy ID</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Timestamp</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Response Code</TableCell>
        <TableCell>Response Message</TableCell>
        <TableCell>Payment Gateway</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage ? applyPagination(rows, page, rowsPerPage) : rows).map((row) => {
              const isSelected = selected?.has(row._id);

              return (
                <TableRow hover key={row._id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row._id);
                        } else {
                          deselectOne(row._id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.transactionId}</TableCell>
      <TableCell>{row.orderId}</TableCell>
      <TableCell>{row.userId}</TableCell>
      <TableCell>{row.pharmacyId}</TableCell>
      <TableCell>{row.amount}</TableCell>
      <TableCell>{row.timestamp}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{row.responseCode}</TableCell>
      <TableCell>{row.responseMessage}</TableCell>
      <TableCell>{row.paymentGateway}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex' }}>
                      {permissions && permissions.view && (
                        <IconButton>
                          <Eye />
                        </IconButton>
                      )}
                      {permissions && permissions.edit && (
                        <IconButton>
                          <PencilSimple />
                        </IconButton>
                      )}
                      {permissions && permissions.delete && (
                        <IconButton color="error">
                          <Trash />
                        </IconButton>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
