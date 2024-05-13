import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { SupabaseClient } from '@supabase/supabase-js';

import { User } from '@/types/user.type';
import { uploadFileToSupabase } from '@/lib/supabase/subapase.utils';
import { useSupabase } from '@/contexts/supbase-context';
import frontendClient from '@/services/frontend-client';


export default function AddMedicineModal({open, setOpen}: {open: boolean, setOpen: Function}) {

  const {supabaseClient} = useSupabase()



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
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
        handleClose()
      }}
    >
      <Card>
        <CardHeader subheader="Add you pharmcy information below" title="Step 1: Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
          <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Medicine Name</FormLabel>
          <OutlinedInput name="medicineName" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Image</FormLabel>
          <OutlinedInput name="image" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Brand Name</FormLabel>
          <OutlinedInput name="brandName" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Generic Name</FormLabel>
          <OutlinedInput name="genericName" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Dosage Form</FormLabel>
          <OutlinedInput name="dosageForm" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Dosage Strength</FormLabel>
          <OutlinedInput name="dosageStrength" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Batch Number</FormLabel>
          <OutlinedInput name="batchNumber" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Expiration Date</FormLabel>
          <OutlinedInput name="expirationDate" type="date" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Quantity</FormLabel>
          <OutlinedInput name="quantity" type="number" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Unit Price</FormLabel>
          <OutlinedInput name="unitPrice" type="number" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Manufacturer</FormLabel>
          <OutlinedInput name="manufacturer" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Supplier</FormLabel>
          <OutlinedInput name="supplier" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Storage Conditions</FormLabel>
          <OutlinedInput name="storageConditions" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Notes</FormLabel>
          <OutlinedInput name="notes" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Prescription Required</FormLabel>
          <OutlinedInput name="prescriptionRequired" type="checkbox" />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
