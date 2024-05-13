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
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';

export const metadata = { title: `Registration Pending | ${config.site.name}` } satisfies Metadata;

export default function Pending(){
  return (
    <Box component="main" sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100%' }}>
      <Stack spacing={3} sx={{ alignItems: 'center', maxWidth: 'md' }}>
        <Box>
          <CircleNotch size={84} color={"green"}/>
        </Box>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Your registration is still pending
        </Typography>
        <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center' }}>
          When its status changes we will notify you via your email or phone number
        </Typography>
        {/* <Button
          component={RouterLink}
          href={paths.home}
          startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          Go back to home
        </Button> */}
      </Stack>
    </Box>
  );
}
