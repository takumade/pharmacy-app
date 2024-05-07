
import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { GeneralFilters } from '@/components/general/general-filter';
import { Medicine, MedicineTable } from '@/components/dashboard/medicine/medicine-table';
import backendClient from '@/services/client';

export const metadata = { title: `Medicine | Dashboard | ${config.site.name}` } satisfies Metadata;



export default async function Page() {

  let response = await backendClient('get', 'medicine/')
  let medicine = response.data


console.log(response)
  return (
    <Stack spacing={3}>
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
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <GeneralFilters item="medicine" />
      <MedicineTable
        count={medicine.length}
        rows={medicine}
      />
    </Stack>
  );
}

