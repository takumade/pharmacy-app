'use client';

import * as React from 'react';
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
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}

export interface Medicine {
  _id: string;
  medicineName: string;
  image: string;
  brandName: string;
  genericName: string;
  dosageForm: string;
  dosageStrength: string;
  batchNumber: string;
  expirationDate: string; // Should be of type Date, but string for simplicity
  quantity: number;
  unitPrice: number;
  manufacturer: string;
  supplier: string;
  storageConditions: string;
  notes: string;
  lastUpdated: string; // Should be of type Date, but string for simplicity
  prescriptionRequired: boolean;
  owner: string;
}

interface GeneralTableProps {
  count?: number;
  page?: number;
  rows?: Medicine[];
  rowsPerPage?: number;
}

export function MedicineTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: GeneralTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((medicine) => medicine._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

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
              <TableCell>Name</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Generic Name</TableCell>
              <TableCell>Dosage Form</TableCell>
              <TableCell>Dosage Strength</TableCell>
              <TableCell>Batch Number</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Expiration Date</TableCell>
              <TableCell>Manufacturer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
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
                      <Avatar src={row.image} />
                      <Typography variant="subtitle2">{row.medicineName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.brandName}</TableCell>
                  <TableCell>{row.genericName}</TableCell>
                  <TableCell>{row.dosageForm}</TableCell>
                  <TableCell>{row.dosageStrength}</TableCell>
                  <TableCell>{row.batchNumber}</TableCell>
                  <TableCell>{row.unitPrice}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.expirationDate}</TableCell>
                  <TableCell>{row.manufacturer}</TableCell>
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
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
