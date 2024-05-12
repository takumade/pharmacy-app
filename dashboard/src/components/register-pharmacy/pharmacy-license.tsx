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
import { uploadFileToSupabase } from '@/lib/supabase/frontend-client';


interface PharmacyLicenseProps {
  user: User | null;
  handleNextStep: Function;
}


const uploadFile = async (user:User, event: any, name: string, bucket: string) => {
  const fileObject = event.target.querySelector(`input[type="file"][name="${name}"]`);
  if (fileObject) {
    // Get the FileList from the file input
    const file = fileObject.files[0];

    let url = await uploadFileToSupabase(user as User, file, 'logos')
    return url as string
  }
}



export function PharmacyLicense({ user, handleNextStep }: PharmacyLicenseProps): React.JSX.Element {
  return (
    <form
    onSubmit={async (event) => {
      event.preventDefault();

      const data:any = {};


      let cclUrl = await uploadFile(user as User, event, "cityCouncilLicense", "licenses")
      data['cityCouncilLicense'] = cclUrl

      let pclUrl = await uploadFile(user as User, event, "pharmacistCouncilLicense", "licenses")
      data['pharmacistCouncilLicense'] = pclUrl

      let hplUrl = await uploadFile(user as User, event, "healthProfessionsAuthorityLicense", "licenses")
      data['healthProfessionsAuthorityLicense'] = hplUrl

      let mcazlUrl = await uploadFile(user as User, event, "medicinesControlAuthorityLicense", "licenses")
      data['medicinesControlAuthorityLicense'] = mcazlUrl





      // @ts-ignore
      const formData = new FormData(event.target);

      let skipKeys = ["cityCouncilLicense", "pharmacistCouncilLicense", "healthProfessionsAuthorityLicense", "medicinesControlAuthorityLicense"  ]

      formData.forEach((value, key) => {

        // @ts-ignore
        if (!skipKeys.includes(key)) data[key] = value;
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
