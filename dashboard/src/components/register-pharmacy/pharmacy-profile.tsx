'use client';

import * as React from 'react';
import { FormLabel } from '@mui/material';
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
import { SupabaseClient } from '@supabase/supabase-js';

import { User } from '@/types/user.type';
import { uploadFileToSupabase } from '@/lib/supabase/subapase.utils';
import { useSupabase } from '@/contexts/supbase-context';

const states = [
  { value: 'harare', label: 'Harare' },
  { value: 'bulawayo', label: 'Bulawayo' },
  { value: 'mutare', label: 'Mutare' },
  { value: 'gweru', label: 'Gweru' },
  { value: 'masvingo', label: 'Masvingo' },
  { value: 'chinhoyi', label: 'Chinhoyi' },
  { value: 'bindura', label: 'Bindura' },
  { value: 'marondera', label: 'Marondera' },
  { value: 'kwekwe', label: 'Kwekwe' },
] as const;

interface PharmacyProfileProps {
  handleNextStep: Function;
}

export function PharmacyProfile({  handleNextStep }: PharmacyProfileProps): React.JSX.Element {

  const {supabaseClient} = useSupabase()


  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        let data = {
          logo: '',
          phone: '',
          email: '',
          contactInformation: {
            phone: '',
            email: ''
          }
        };

        // @ts-ignore
        const logoFile = event.target.querySelector('input[type="file"][name="logo"]');
        if (logoFile) {
          // Get the FileList from the file input
          const file = logoFile.files[0];

          let url = await uploadFileToSupabase( supabaseClient as SupabaseClient, file, 'logos')
          data.logo = url as string
        }

        // @ts-ignore
        const formData = new FormData(event.target);

        formData.forEach((value, key) => {

          // @ts-ignore
          if (key != "logo") data[key] = value;
        });


        data.contactInformation = {
          phone: data.phone,
          email: data.email
        }
        // Now you can use the 'data' object to access form values
        console.log(data);
        handleNextStep(data)
      }}
    >
      <Card>
        <CardHeader subheader="Add you pharmcy information below" title="Step 1: Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={12} xs={12}>
              <FormControl fullWidth required>
                <FormLabel>Logo</FormLabel>
                <OutlinedInput type="file" label="Logo" name="logo" />
              </FormControl>
            </Grid>
            <Grid md={12} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput placeholder="MediCare" label="Name" name="name" />
              </FormControl>
            </Grid>
            <Grid md={12} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Address</InputLabel>
                <OutlinedInput placeholder="Address here" label="Address" name="location" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Latitude</InputLabel>
                <OutlinedInput placeholder="-17.234343" label="Latitude" name="latitude" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Longitude</InputLabel>
                <OutlinedInput placeholder="-31.23232" label="Longitude" name="longitude" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput placeholder="sofia@devias.io" label="Email address" name="email" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput placeholder="+263778123123" label="Phone number" name="phone" type="tel" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select defaultValue="New York" label="State" name="state" variant="outlined">
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <OutlinedInput label="City" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
