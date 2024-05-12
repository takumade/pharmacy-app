'use client'

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


import { useUser } from '@/hooks/use-user';
import supabase from '@/lib/supabase/frontend-client';
import frontendClient from '@/services/frontend-client';
import { useSnackbar } from '@/contexts/snackbar-context';
import { title } from 'process';



export default function Page(): React.JSX.Element {



  const {updateMessage} = useSnackbar()


  const [step, changeStep] = React.useState(0)
  const [pharmacyData, setPharmacyData] = React.useState<any>({})

  const handleNextStep = (data:any) => {
    setPharmacyData({
      ...pharmacyData,
      ...data
    })

    changeStep(currStep => currStep + 1 )
  }

  const handleApply = async (data:any) => {

    let applicationData = {
      ...pharmacyData,
      ...data
    }

    let response = await frontendClient('post', 'pharmacy/create', applicationData)

    if (response.success){
      updateMessage({
        title: "Register Pharmacy",
        type: 'success',
        message: response.message
      })
    }else{
      updateMessage({
        title: "Register Pharmacy",
        type: 'error',
        message: response.message
      })
    }
  }

  return (
    <Stack spacing={3} style={{padding:"5rem"}}>
      <div>
        <Typography variant="h4">Register Pharmacy</Typography>
      </div>
      {step === 0 &&<Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <PharamcyInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <PharmacyProfile handleNextStep={handleNextStep}/>
        </Grid>
      </Grid>}

      {step === 1 && <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
        </Grid>
        <Grid lg={8} md={6} xs={12}>
        <PharmacyLicense handleNextStep={handleNextStep}/>
        </Grid>
      </Grid>}


      {step === 2 && <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>

        </Grid>
        <Grid lg={8} md={6} xs={12}>
        <PharmacyOperatingHours handleApply={handleApply}/>
        </Grid>
      </Grid>}
    </Stack>
  );
}
