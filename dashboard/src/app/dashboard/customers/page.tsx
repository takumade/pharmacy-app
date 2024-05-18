
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

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;



export default async function Page() {



  let response: APIResponse
  let customers:User[] = []

  let userObject = cookies().get("custom-auth-user")
  let user: User = JSON.parse(userObject?.value as string)


  if (user.role === "admin"){
    response = await backendClient('get', 'pharmacy/customers')
    customers = response.data
  }

  if (user.role === UserRoles.pharmacy){
    let pharmacyReponse = await backendClient('get', `pharmacy/search?owner${user._id}`)
    let pharmacy:Pharmacy = pharmacyReponse.data[0]
    response = await backendClient('get', `pharmacy/customers/${pharmacy._id}`)
    customers = response.data
  }



  let permissions: RolePerm = getPermissions(user.role, 'users')


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Users</Typography>
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
      <GeneralFilters item="users" />
      <UserTable
        count={customers.length}
        rows={customers}
        permissions={permissions}
      />
    </Stack>
  );
}

