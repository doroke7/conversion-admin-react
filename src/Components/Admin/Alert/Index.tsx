import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import style from './style';

interface State {
  open: boolean;
  message: string;
}

function SlideUp(oProps) {
  return <Slide {...oProps} direction="down" />;
}

function Alert(oProps: any) {
  let oClasses: any = style(void 0);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={oProps.open}
      autoHideDuration={2000}
      onClose={oProps.onClose}
      TransitionComponent={SlideUp}
      message={oProps.message}
      key=""
      action={
        <>
          <IconButton aria-label="close" className={oClasses.close} color="inherit" onClick={oProps.onClose}>
            <CloseIcon />
          </IconButton>
        </>
      }
    />
  );
}
export default Alert;
