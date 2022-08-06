import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
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
  let cHandleClose = oProps.onClose ?? (() => void 0);

  let dCodesToSeverities = {
    '2': 'success',
    '1': 'info',
    '0': '',
    '-1': 'warning',
    '-2': 'error'
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={bOpen}
      autoHideDuration={10000}
      onClose={cHandleClose}
      message="登入成功"
      action={
        <>
          <Button color="secondary" size="small" onClick={cHandleClose}>
            UNDO
          </Button>
          <IconButton size="small" aria-label="close" color="inherit" onClick={cHandleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
}
export default Alerts;
