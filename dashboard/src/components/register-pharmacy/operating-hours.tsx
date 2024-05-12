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


export function PharmacyOperatingHours({ handleApply }: { handleApply: Function }): React.JSX.Element {
  return (
    <form
    onSubmit={(event) => {
      event.preventDefault();

      // @ts-ignore
      const formData = new FormData(event.target);
      const data = {
        operatingHours: {},
        weekdaystart: '',
        weekdaysend: '',
        weekendstart: '',
        weekendend: ''
      };

      formData.forEach((value, key) => {
        //@ts-ignore
        data[key] = value;
      });
      // Now you can use the 'data' object to access form values
      console.log(data);

      data.operatingHours = {
        weekdays: {
            start: data.weekdaystart,
            end: data.weekdaysend
        },
        weekends: {
            start: data.weekendstart,
            end: data.weekendend
        }
    }
      handleApply(data)
    }}
    >
      <Card>
        <CardHeader subheader="Add you pharmacy operating hours" title="Step 3: Operating Hours" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <FormLabel>Weekday Opening Hours</FormLabel>
                <OutlinedInput type="time" label="Weekday Start" name="weekdaystart" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <FormLabel>Weekday Closing Hours</FormLabel>
                <OutlinedInput type="time" label="Weekday End" name="weekdayend" />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <FormLabel>Weekend Opening Hours</FormLabel>
                <OutlinedInput type="time" label="Weekend Start" name="weekendstart" />
              </FormControl>
            </Grid>

            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <FormLabel>Weekend Closing Hours</FormLabel>
                <OutlinedInput type="time" label="Weekend End" name="weekendend" />
              </FormControl>
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Apply</Button>
        </CardActions>
      </Card>
    </form>
  );
}
