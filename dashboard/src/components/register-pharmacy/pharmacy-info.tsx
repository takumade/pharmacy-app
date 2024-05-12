import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useUser } from '@/hooks/use-user';


export function PharamcyInfo({}): React.JSX.Element {

  const {user} = useUser()
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={user?.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user?.fullName}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.email} {user?.phoneNumber}
            </Typography>
            {/* <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography> */}
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}
