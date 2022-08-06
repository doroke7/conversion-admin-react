import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';

import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import style from './style';

function Alerts(oProps: any): any {
  let oClasses: any = style(void 0);

  let [oState, cSetState] = React.useState<any>({
    open: true,
    code: 1,
    message: 'MESSAGE',
    title: 'TITLE'
  });

  let cHandleClick = () => {
    cSetState({ ...oState, open: true });
  };

  let cHandleClose = (event: React.SyntheticEvent | React.MouseEvent, sReason?: string) => {
    if (sReason === 'clickaway') {
      return;
    }

    cSetState({ ...oState, open: false });
  };

  let dCodesToSeverities = {
    '2': 'success',
    '1': 'info',
    '0': '',
    '-1': 'warning',
    '-2': 'error'
  };

  let sSeverity = dCodesToSeverities[oState.code] ?? '';

  return sSeverity && oState.title && oState.message ? (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={oState.open}
      autoHideDuration={3000}
      onClose={cHandleClose}
      TransitionComponent={Slide}
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
        <AlertTitle className={oClasses.alertTitle}>{oState.title}</AlertTitle>
        <span className={oClasses.message}>{oState.message}</span>
      </Alert>
    </Snackbar>
  ) : (
    ''
  );
}
export default Alerts;
/**
 * TransitionComponent={(oProps: any) => <Slide direction="down"></Slide>}>
 * TransitionComponent={Slide}>
 *
 * 新版的 React 已经不倾向上述的写法
 * 新版的 React 已经则倾向下述的写法
 * 新式写法比较直觉，不过这写法无法向下兼容
 *
 * TransitionComponent={<Slide direction="down"></Slide>}>
 * TransitionComponent={<Slide/>}>
 *
 */
