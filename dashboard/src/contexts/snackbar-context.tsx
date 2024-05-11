'use client';

import * as React from 'react';
;
import GeneralSnackbar from '@/components/general/snackbar';

export interface SnackbarContextValue {
  open: boolean,
  updateMessage: Function
}

interface MessageOptions {
  type: string;
  title: string;
  body:string;
}

export const SnackbarContext = React.createContext<SnackbarContextValue>({
  open: false,
  updateMessage: () => {}
});

export interface SnackbarProviderProps {
  children: React.ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps): React.JSX.Element {

  const [message, setMessageOptions] = React.useState<MessageOptions>({
    type: '',
    title: '',
    body: ''
  })

  const [open, setOpen] = React.useState(false)

  const updateMessage = (options:MessageOptions) => {
    setOpen(true)
    setMessageOptions(options)
  }



  return <SnackbarContext.Provider value={{ open, updateMessage }}>
    <GeneralSnackbar open={open} setOpen={setOpen} snackOptions={message}/>
    {children}</SnackbarContext.Provider>;
}

export const useSnackbar = () => {
  return React.useContext(SnackbarContext)
}
