'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { FormLabel } from '@mui/material';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '@/types/user.type';


interface PharmacyLicenseProps {
  user: User;
  handleNextStep: Function;
  supabaseClient: SupabaseClient;
}



export function PharmacyLicense({ user, handleNextStep, supabaseClient }: PharmacyLicenseProps): React.JSX.Element {
  return (
    <form
    onSubmit={async (event) => {
      event.preventDefault();



      // @ts-ignore
      const logoFile = event.target.querySelector('input[type="file"][name="logo"]');
      if (logoFile) {
          // Get the FileList from the file input
          const files = logoFile.files;

          const { data, error } = await supabaseClient.storage.from('logos').upload(`public/somefile.png`, files[0])

          // TODO: Finish off here
      }




      // @ts-ignore
      const formData = new FormData(event.target);
      const data = {};
      formData.forEach((value, key) => {
        //@ts-ignore
        data[key] = value;
      });
      // Now you can use the 'data' object to access form values
      console.log(data);
      handleNextStep(data)
    }}
    >
      <Card>
        <CardHeader subheader="Upload your licenses below" title="Step 2: Licenses" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <FormLabel>City Council License</FormLabel>
                <OutlinedInput type="file" label="City Council License" name="cityCouncilLicense" />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <FormLabel>Pharmacist Council License</FormLabel>
                <OutlinedInput type="file" label="Pharmacist Council  License" name="pharmacistCouncilLicense" />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <FormLabel>Health Professionals License</FormLabel>
                <OutlinedInput type="file" label="Health Professionals License" name="healthProfessionsAuthorityLicense" />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <FormLabel>Medicines Control License</FormLabel>
                <OutlinedInput type="file" label="Medicines Control License" name="medicinesControlAuthorityLicense" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Next</Button>
        </CardActions>
      </Card>
    </form>
  );
}
