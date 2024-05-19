import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';
import { cookies } from 'next/headers';
import { User } from '@/types/user.type';

export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {



  let userObject = cookies().get("custom-auth-user")
  let user: User = JSON.parse(userObject?.value as string)


  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo user={user} />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm user={user} />
        </Grid>
      </Grid>
    </Stack>
  );
}
