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
import Image from 'next/image';

function noop(): void {
  // do nothing
}


interface Pharmacy {
  _id: string;
  owner: string;
  name: string;
  logo: string;
  location: string;
  latitude: number;
  longitude: number;
  contactInformation: {
    // Define properties for contact information object here
    email:string;
    phone: string;
  };
  operatingHours: {
    // Define properties for operating hours object here
  };
  cityCouncilLicense: string;
  pharmacistCouncilLicense: string;
  healthProfessionsAuthorityLicense: string;
  medicinesControlAuthorityLicense: string;
  isBanned: boolean;
  bannedEnd: Date;
  isApproved: boolean;
  applicationStatus: string;
  applicationReason: string;
  isDeleted: boolean;
  onFreeTrial: boolean;
  trialEnds: Date;
  isSubscribed: boolean;
  subscriptionsEnds: Date;
  additionalNotes: string;
  __v: number;
}

interface GeneralTableProps {
  count?: number;
  page?: number;
  rows?: Pharmacy[];
  rowsPerPage?: number;
  permissions: RolePerm;
}

export function PharmacyTable({ count = 0, rows = [], permissions }: GeneralTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((user) => user._id);
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

  function applyPagination(rows: Pharmacy[], page: number, rowsPerPage: number): Pharmacy[] {
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
              <TableCell>Logo</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              {/* <TableCell>Application Status</TableCell> */}
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
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>

                      <Avatar src={row.logo} />
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.contactInformation.email}</TableCell>
                  <TableCell>{row.contactInformation.phone}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  {/* <TableCell>{row.isApproved ? "approved" : row.applicationStatus}</TableCell> */}
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
