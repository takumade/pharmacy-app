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

import { Pharmacy } from '@/types/pharmacy.type';


import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSnackbar } from '@/contexts/snackbar-context';
import frontendClient from '@/services/frontend-client';
import { Order } from '@/types/order.type';



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface OrderModalProps {
  open: boolean;
  setOpen: any;
  order: Order;
}

export default function OrdersModal({ open, setOpen, order }: OrderModalProps) {
  // TODO: When user removes user successfully denies or approve request....remove it from list


  const { updateMessage } = useSnackbar()


  const handleClose = () => {
    setOpen(false);
  };

  const approve = async () => {

    let response = await frontendClient('post', `order/approve/${order._id}`, {})

    if (response.success){

    updateMessage({
      title: 'Approve Applicaton',
      body: response.message,
      type: "success"
    })
    }else{
      updateMessage({
        title: 'Approve Applicaton',
        body: response.message,
        type: "error"
      })

    }

    handleClose()


  }


  const decline =async (reason: string) => {
    let response = await frontendClient('post', `order/deny/${order._id}`, {reason})

    if (response.success){

      updateMessage({
        title: 'Decline Applicaton',
        body: response.message,
        type: "success"
      })
      }else{
        updateMessage({
          title: 'Decline Applicaton',
          body: response.message,
          type: "error"
        })

      }

      handleClose()
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
              Order
            </Typography>
          </Toolbar>
        </AppBar>
        <Stack spacing={3} style={{ padding: '5rem' }}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12} spacing={3}>
              <Grid item>
                <MainInfo order={order} />
              </Grid>
              <Grid item style={{marginTop: 12}}>
                <Prescriptions  order={order} handleApprove={approve} handleDecline={decline} />
              </Grid>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <OrderItems  order={order} handleApprove={approve} handleDecline={decline} />
            </Grid>
          </Grid>


        </Stack>
      </Dialog>
    </React.Fragment>
  );
}

export function MainInfo({ order }: { order: Order }): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Grid container spacing={3}>
            <Grid item>
              {' '}
              <div>
                <Avatar src={order.userId.avatar} sx={{ height: '80px', width: '80px' }} />
              </div>
            </Grid>
            <Grid item>
              <Stack spacing={1} sx={{ textAlign: 'left' }}>
                <Typography variant="h5">{order.userId.fullName}</Typography>
                <Typography color="text.secondary" variant="body2">
                   {order.userId.email}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {order.userId.phoneNumber}
                </Typography>

              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}


function OrderItems({ order, handleApprove, handleDecline }: { order: Order, handleApprove: Function, handleDecline: Function }): React.JSX.Element {

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

  const handleChange = (event: any) => {
    // @ts-ignore
      setReason(event.target.value)
  }



  return (
    <React.Fragment

    >


      <Card>
        <CardHeader subheader="The user ordered these item" title="Items" />
        <Divider />
        <CardContent>


        <List>
          {
            order.items.map(item => <ListItemButton>
              <ListItemText primary={item.productName}secondary={"Quanity: " + item.quantity + "  Total Amount: " + item.price} />
            </ListItemButton>)
          }
          <Divider />
        </List>

          <Stack  spacing={1}>

            <InputLabel htmlFor="decline-reason">Decline Reason</InputLabel>
              <FormControl id="decline-reason" fullWidth>

                <TextareaAutosize minRows={5} onChange={handleChange}/>
              </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="error" onClick={() => handleDecline(reason)}>Decline</Button>
          <Button variant="contained" onClick={() => handleApprove()}>Approve</Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}


function Prescriptions({ order, handleApprove, handleDecline }: { order: Order, handleApprove: Function, handleDecline: Function }): React.JSX.Element {

  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);



  const openImageViewer = async (id:string) => {

    let response = await frontendClient('get', `prescription/${id}`, {})

    let image = response.data.src

    setImages([image])
    setCurrentImage(0);
    setIsViewerOpen(true);
  }

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };


  return (
    <React.Fragment

    >


      <Card>
        <CardHeader subheader="The user submitted these prescription(s)" title="Prescriptions" />
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
          {
            order && order.prescriptions.map((item, index) => <ListItemButton onClick={() => openImageViewer(item._id)}>
              <ListItemText primary={"Prescription #" + (index + 1)}secondary={item._id} />
            </ListItemButton>)
          }
        </List>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
