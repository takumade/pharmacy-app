
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
import {  MedicineTable } from '@/components/dashboard/tables/medicine-table';
import backendClient from '@/services/backend-client';
import { cookies } from 'next/headers';
import { User } from '@/types/user.type';
import {  RolePerm } from '@/types/permissions.type';
import { getPermissions } from '@/permissions';
import { APIResponse } from '@/types/api-response';
import { Pharmacy } from '@/types/pharmacy.type';

export const metadata = { title: `Medicine | Dashboard | ${config.site.name}` } satisfies Metadata;



export default async function Page() {

  let response: APIResponse = await backendClient('get', 'medicine/')
  let medicine = response.data


  let userObject = cookies().get("custom-auth-user")
  let user: User = JSON.parse(userObject?.value as string)

  let pharmacy: Pharmacy = medicine.length > 0 ? medicine[0].pharmacy : null
  let permissions: RolePerm = getPermissions(user.role, 'medicine')



  return (
    <Stack spacing={3}>

      <MedicineTable
        pharmacy={pharmacy}
        count={medicine.length}
        rows={medicine}
        permissions={permissions}
      />
    </Stack>
  );
}

