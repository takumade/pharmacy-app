import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { config } from '@/config';
import { paths } from '@/paths';
import { CircleNotch, Prohibit } from '@phosphor-icons/react/dist/ssr';
import { cookies } from 'next/headers';
import backendClient from '@/services/backend-client';
import { User } from '@/types/user.type';
import { Pharmacy } from '@/types/pharmacy.type';

export const metadata = { title: `Registration Pending | ${config.site.name}` } satisfies Metadata;

export default async function Declined(){

  let userStr = cookies().get('custom-auth-user')
  let user:User = JSON.parse(userStr?.value as string)

  let response = await backendClient('get', `pharmacy/search?owner=${user._id}`, {})
  let reason = "Reason was not specified. Reach to our team for clarification."

  if (response.success){
    if (response.data.length > 0){
      let pharmacy: Pharmacy = response.data[0]

      if (reason.length > 0)
          reason = pharmacy.applicationReason
    }
  }

  return (
    <Box component="main" sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100%' }}>
      <Stack spacing={3} sx={{ alignItems: 'center', maxWidth: 'md' }}>
        <Box>
          <Prohibit size={84} color={"red"}/>
        </Box>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Your registration was declined
        </Typography>
        <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center' }}>
          {reason}
        </Typography>
        <Button
          component={RouterLink}
          href={paths.home}
          startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          Apply Again
        </Button>
      </Stack>
    </Box>
  );
}
