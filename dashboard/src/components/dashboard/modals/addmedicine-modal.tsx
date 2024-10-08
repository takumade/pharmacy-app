import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FormLabel, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { SupabaseClient } from '@supabase/supabase-js';

import { uploadFileToSupabase } from '@/lib/supabase/subapase.utils';
import { useSupabase } from '@/contexts/supbase-context';
import frontendClient from '@/services/frontend-client';
import { Pharmacy } from '@/types/pharmacy.type';
import { useSnackbar } from '@/contexts/snackbar-context';
import { title } from 'process';


const dosageFormTypes = [
  { value: 'tablet', label: 'Tablet' },
  { value: 'capsule', label: 'Capsule' },
  { value: 'liquid', label: 'Liquid' },
  { value: 'injectable', label: 'Injectable' },
  { value: 'topical', label: 'Topical' },
  { value: 'inhalant', label: 'Inhalant' },
  { value: 'suppository', label: 'Suppository' },
  { value: 'implant', label: 'Implant' },
];


export default function AddMedicineModal({open, setOpen, pharmacy}: {open: boolean, setOpen: Function, pharmacy:Pharmacy}) {

  const {supabaseClient} = useSupabase()
  const {updateMessage} = useSnackbar()

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <form
      onSubmit={async (event:any) => {
        event.preventDefault();

        let data = {
          image: "",
          owner: pharmacy._id
        };

        // @ts-ignore
        const imageFile = event.target.querySelector('input[type="file"][name="image"]');
        if (imageFile) {
          // Get the FileList from the file input
          const file = imageFile.files[0];

          let url = await uploadFileToSupabase( supabaseClient as SupabaseClient, file, 'medicine')
          data.image = url as string
        }

        // @ts-ignore
        const formData = new FormData(event.target);

        formData.forEach((value, key) => {

          // @ts-ignore
          if (key != "image") data[key] = value;
        });

        let response = await frontendClient('post', 'medicine/create', data)

        if (response.success){
          updateMessage({
            type: "success",
            title: "Add Medicine",
            body: response.message
          })

          handleClose()
        }else{
          updateMessage({
            type: "error",
            title: "Add Medicine",
            body: response.message
          })

          handleClose()
        }


        // Now you can use the 'data' object to access form values

      }}
    >
        <DialogTitle id="alert-dialog-title">
          {"Add Medicine"}
        </DialogTitle>
        <DialogContent>


          <Grid container spacing={3}>
          <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Medicine Name</FormLabel>
          <OutlinedInput placeholder="Penicillin" name="medicineName" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Image</FormLabel>
          <OutlinedInput name="image" type="file" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Brand Name</FormLabel>
          <OutlinedInput placeholder="Pfizerpen" name="brandName" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Generic Name</FormLabel>
          <OutlinedInput placeholder='Penicillin' name="genericName" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Dosage Form</FormLabel>
          {/* <OutlinedInput placeholder="capsules" name="dosageForm" type="text" /> */}

          <Select name="dosageForm" defaultValue={"capsule"}>
    {dosageFormTypes.map(({ value, label }) => (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    ))}
  </Select>
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Dosage Strength</FormLabel>
          <OutlinedInput placeholder="500mg" name="dosageStrength" type="text" />
        </FormControl>
      </Grid>
      <Grid  md={12} xs={12}>
        <FormControl fullWidth required>
          <FormLabel>Batch Number</FormLabel>
          <OutlinedInput placeholder='ABC123456' name="batchNumber" type="text" />
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
          <OutlinedInput placeholder='30' name="quantity" type="number" />
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
          <OutlinedInput placeholder='Pfizer' name="manufacturer" type="text" />
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
          <Select name="prescriptionRequired" defaultValue={"false"}>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false" >No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClose} autoFocus>
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
