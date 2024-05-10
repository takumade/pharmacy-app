import * as React from 'react';
import { Grid, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { X } from '@phosphor-icons/react/dist/ssr';

import { Pharmacy } from '@/types/pharmacy';
import { PharmacyOperatingHours } from '@/components/register-pharmacy/operating-hours';
import { PharmacyLicense } from '@/components/register-pharmacy/pharmacy-license';
import { PharmacyProfile } from '@/components/register-pharmacy/pharmacy-profile';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ApplicationModalProps {
  open: boolean;
  setOpen: any;
  application: Pharmacy;
}

export default function ApplicationModal({ open, setOpen, application }: any) {
  console.log('App: ', application);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }} color="secondary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <X />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Pharmacy Application
            </Typography>
            <Button autoFocus color="success" onClick={handleClose}>
              Approve
            </Button>
            <Button autoFocus color="warning" onClick={handleClose}>
              Decline
            </Button>
          </Toolbar>
        </AppBar>
        <Stack spacing={3} style={{ padding: '5rem' }}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <MainInfo application={application} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <PharmacyProfile />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid lg={4} md={6} xs={12}></Grid>
            <Grid lg={8} md={6} xs={12}>
              <PharmacyLicense />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid lg={4} md={6} xs={12}></Grid>
            <Grid lg={8} md={6} xs={12}>
              <PharmacyOperatingHours />
            </Grid>
          </Grid>
        </Stack>
      </Dialog>
    </React.Fragment>
  );
}

export function MainInfo({ application }: { application: Pharmacy }): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Grid container spacing={3}>
            <Grid item>
              {' '}
              <div>
                <Avatar src={application.logo} sx={{ height: '80px', width: '80px' }} />
              </div>
            </Grid>
            <Grid item>
              <Stack spacing={1} sx={{ textAlign: 'left' }}>
                <Typography variant="h5">{application.name}</Typography>
                <Typography color="text.secondary" variant="body2">
                   {application.location}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Lat: {application.latitude} , Long: {application.longitude}
                </Typography>

              </Stack>
            </Grid>
          </Grid>
          <Stack spacing={1} >
          <Typography color="text.secondary" variant="body2">
                  <b>Phone:</b> {application.contactInformation.phone}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  <b>Email:</b> {application.contactInformation.email}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                 <b>Operating Hours: </b> {application.operatingHours.weekdays.start} - {application.operatingHours.weekdays.end} (Weekdays) / {application.operatingHours.weekends.start} - {application.operatingHours.weekends.end} (Weekends)
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}
