import * as React from 'react';
import { FormControlLabel, Grid, Stack } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import ImageViewer from 'react-simple-image-viewer'

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



import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

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

  const approve = () => {

  }


  const decline = (reason: string) => {

  }



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
          </Toolbar>
        </AppBar>
        <Stack spacing={3} style={{ padding: '5rem' }}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <MainInfo application={application} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <PharmacyLicenses  application={application} handleApprove={approve} handleDecline={decline} />
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


export function PharmacyLicenses({ application, handleApprove, handleDecline }: { application: Pharmacy, handleApprove: Function, handleDecline: Function }): React.JSX.Element {

  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);
  const [reason, setReason] = React.useState<string>("");


  const openImageViewer = (image:string) => {
    setImages([image])
    setCurrentImage(0);
    setIsViewerOpen(true);
  }

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleChange = (event: Event) => {
    // @ts-ignore
      setReason(event.target.value)
  }



  return (
    <React.Fragment

    >


      <Card>
        <CardHeader subheader="Click item to view. Click outside image to close" title="Licenses" />
        <Divider />
        <CardContent>

        {isViewerOpen && (
        <ImageViewer
          src={ images }
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
      )}

        <List>
          <ListItemButton onClick={() => openImageViewer(application.cityCouncilLicense)}>
            <ListItemText primary="City Council License" secondary="" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => openImageViewer(application.pharmacistCouncilLicense)}>
            <ListItemText primary="Pharmacist Council License" secondary="" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => openImageViewer(application.medicinesControlAuthorityLicense)}>
            <ListItemText primary="Medicines Control Authority License" secondary="" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => openImageViewer(application.healthProfessionsAuthorityLicense)}>
            <ListItemText primary="Health Professional Authority License" secondary="" />
          </ListItemButton>
        </List>

          <Stack  spacing={1}>

            <InputLabel htmlFor="decline-reason">Decline Reason</InputLabel>
              <FormControl id="decline-reason" fullWidth>

                <TextareaAutosize minRows={5} />
              </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="error" onDoubleClick={() => handleDecline(reason)}>Decline</Button>
          <Button variant="contained" onDoubleClick={handleApprove}>Approve</Button>

        </CardActions>
      </Card>
    </React.Fragment>
  );
}
