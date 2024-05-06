import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { PharmacyProfile } from '@/components/register-pharmacy/pharmacy-profile';
import { PharmacyLicense } from '@/components/register-pharmacy/pharmacy-license';
import { PharmacyOperatingHours } from '@/components/register-pharmacy/operating-hours';
import { PharamcyInfo } from '@/components/register-pharmacy/pharmacy-info';

export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3} style={{padding:"5rem"}}>
      <div>
        <Typography variant="h4">Register Pharmacy</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <PharamcyInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <PharmacyProfile />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
        </Grid>
        <Grid lg={8} md={6} xs={12}>
        <PharmacyLicense />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>

        </Grid>
        <Grid lg={8} md={6} xs={12}>
        <PharmacyOperatingHours/>
        </Grid>
      </Grid>
    </Stack>
  );
}
