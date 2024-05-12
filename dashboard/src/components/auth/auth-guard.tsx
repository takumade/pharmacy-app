'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);


  const checkPermissions = async (): Promise<void> => {

    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }

    if (user) {
      logger.debug('[GuestGuard]: User is logged in, redirecting to dashboard');

      if (user.role === "pharmacy"){
        if (!user.pharmacy){
          router.replace(paths.auth.registerPharmacy)
        }else if (user.pharmacy && user.pharmacy.applicationStatus === "pending"){
          router.replace(paths.registration.pending)
        }else if (user.pharmacy && user.pharmacy.applicationStatus === "declined"){
          router.replace(paths.registration.declined)
        }else if (user.pharmacy && user.pharmacy.applicationStatus === "approved"){
          router.replace(paths.dashboard.overview)
        }
      }

      if (user.role === "admin")
        router.replace(paths.dashboard.overview);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
