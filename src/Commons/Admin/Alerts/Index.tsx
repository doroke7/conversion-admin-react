import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';

import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import events from '@/events';

import style from './style';

function Alerts(oProps: any): any {
  let oClasses: any = style(void 0);

  let [oState, cSetState] = React.useState<any>({
    open: false,
    code: 1,
    message: 'MESSAGE',
    time: 2000
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
    '-2': 'error',
    '-3': 'critical'
  };

  let dCodesToTitles = {
    '2': '成功',
    '1': '资讯',
    '0': '',
    '-1': '警告',
    '-2': '错误',
    '-3': '严重'
  };

  let sSeverity = dCodesToSeverities[oState.code] ?? '';
  let sTitle = dCodesToTitles[oState.code] ?? '';
  useEffect(() => {
    let cAlert = (oMessage: any) => {
      cSetState({
        ...oState,
        open: true,
        code: oMessage?.code ?? 0,
        message: oMessage?.message ?? '',
        time: oMessage?.time ?? oState.time
      });
    };
    let oEventEmitter: any = events.admin.addListener('Alerts-onAlert', cAlert);
    return () => {
      events.admin.removeListener('Alerts-onAlert', cAlert);
    };
  }, []);

  return sSeverity && oState.message ? (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={oState.open}
      autoHideDuration={oState.time}
      onClose={cHandleClose}
      TransitionComponent={Slide}
      action={<></>}>
      <Alert
        className={clsx(
          {},
          {
            [oClasses.success]: oState.code == 2,
            [oClasses.info]: oState.code == 1,
            [oClasses.warning]: oState.code == -1,
            [oClasses.error]: oState.code == -2,
            [oClasses.critical]: oState.code == -3
          }
        )}
        onClose={cHandleClose}
        severity={sSeverity}
        elevation={3}
        variant="filled">
        <AlertTitle className={oClasses.alertTitle}>{sTitle}</AlertTitle>
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
