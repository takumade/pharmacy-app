'use client';

import * as React from 'react';
import { Button, Grid, IconButton } from '@mui/material';
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

import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { Permissions, RolePerm } from '@/types/permissions.type';
import { useSelection } from '@/hooks/use-selection';
import { GeneralFilters } from '@/components/general/general-filter';
import AddMedicineModal from '../modals/addmedicine-modal';
import { Pharmacy } from '@/types/pharmacy.type';

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
  pharmacy: Pharmacy,
  rowsPerPage?: number;
  permissions: RolePerm;
}

export function MedicineTable({ count = 0, rows = [], permissions, pharmacy }: GeneralTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((medicine) => medicine._id);
  }, [rows]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openAddMedicine, setOpenAddMedicne] = React.useState(false)

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function applyPagination(rows: Medicine[], page: number, rowsPerPage: number): Medicine[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const onPageChange = (event: React.MouseEvent | null, page: number) => {
    fetch(`${process.env.CLIENT_URI}?page=${page}`);
  };

  return (
    <React.Fragment>

      <AddMedicineModal open={openAddMedicine} setOpen={setOpenAddMedicne} pharmacy={pharmacy}/>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Medicine</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button onClick={()=> setOpenAddMedicne(true)} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <GeneralFilters item="medicine" />
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
              <TableCell>Dosage Form</TableCell>
              <TableCell>Dosage Strength</TableCell>
              <TableCell>Batch Number</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Expiration Date</TableCell>
              <TableCell>Manufacturer</TableCell>
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
                      <Avatar src={row.image} />
                      <Typography variant="subtitle2">{row.medicineName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.brandName}</TableCell>
                  <TableCell>{row.dosageForm}</TableCell>
                  <TableCell>{row.dosageStrength}</TableCell>
                  <TableCell>{row.batchNumber}</TableCell>
                  <TableCell>{row.unitPrice}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.expirationDate}</TableCell>
                  <TableCell>{row.manufacturer}</TableCell>
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
    </React.Fragment>
  );
}
