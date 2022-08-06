import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import style from './style';

function Alerts(oProps: any): any {
  let oClasses: any = style(void 0);

  let bOpen = oProps.open ?? false;
  let iCode = oProps.code ?? 0;
  let sMessage = oProps.message ?? '';
  let sTitle = oProps.title ?? '';
  let cHandleClose = oProps.onClose ?? (() => void 0);

  let dCodesToSeverities = {
    '2': 'success',
    '1': 'info',
    '0': '',
    '-1': 'warning',
    '-2': 'error'
  };

  let sSeverity = dCodesToSeverities[iCode] ?? '';

  return sSeverity && sTitle && sMessage ? (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={bOpen}
      autoHideDuration={40000}
      onClose={cHandleClose}
      action={
        <>
          <Button color="secondary" size="small" onClick={cHandleClose}>
            UNDO
          </Button>
          <IconButton size="small" aria-label="close" color="inherit" onClick={cHandleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }>
      <Alert onClose={cHandleClose} severity={sSeverity} elevation={3} variant="filled">
        <AlertTitle>{sTitle}</AlertTitle>
        {sMessage}
      </Alert>
    </Snackbar>
  ) : (
    ''
  );
}
export default Alerts;
