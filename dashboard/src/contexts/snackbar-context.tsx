'use client';

import * as React from 'react';

import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import GeneralSnackbar from '@/components/general/snackbar';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface SnackbarProviderProps {
  children: React.ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps): React.JSX.Element {
  const [state, setState] = React.useState(false)
  const [message, messageOptions] = React.useState<MessageOptions>({})



  const [snackOptions, setOpenSnack] = React.useState<SnackbarProps>({
    open: false,
    setOpen: () => {},
    title: "",
    type: "",
    body: ""
  })
  const [open, setOpen] = React.useState(false)

  const updateMessage = (options:MessageOptions) => {
    setOpen(true)
    setOpenSnack({
      ...options,
      open: open,
      setOpen: setOpen
    })
  }


  React.useEffect(() => {
    checkSession().catch((err) => {
      logger.error(err);
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return <UserContext.Provider value={{ ...state, checkSession }}>
    <GeneralSnackbar />
    {children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
