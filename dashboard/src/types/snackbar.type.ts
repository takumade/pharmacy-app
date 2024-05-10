export interface SnackbarProps {
  open: boolean,
  setOpen: Function;
  snackOptions: {
    type: string;
    title: string;
    body:string;
  }
}
