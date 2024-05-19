
import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { config } from '@/config';
import { GeneralFilters } from '@/components/general/general-filter';
import backendClient from '@/services/backend-client';
import { cookies } from 'next/headers';
import { User, UserRoles } from '@/types/user.type';
import {  RolePerm } from '@/types/permissions.type';
import { getPermissions } from '@/permissions';
import { APIResponse } from '@/types/api-response';
import { TransactionsTable } from '@/components/dashboard/tables/txn-table';
import { UserTable } from '@/components/dashboard/tables/user-table';
import { Pharmacy } from '@/types/pharmacy.type';
import { CustomerTable } from '@/components/dashboard/tables/customer-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;



export default async function Page() {



  let response: APIResponse =  await backendClient('get', 'pharmacy/customers', {})
  let customers:User[] = response.data

  let userObject = cookies().get("custom-auth-user")
  let user: User = JSON.parse(userObject?.value as string)





  let permissions: RolePerm = getPermissions(user.role, 'users')


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        {/* <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div> */}
      </Stack>
      <GeneralFilters item="customers" />
      <CustomerTable
        count={customers.length}
        rows={customers}
        permissions={permissions}
      />
    </Stack>
  );
}

