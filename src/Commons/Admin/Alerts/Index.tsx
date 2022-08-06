import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import ReportProblemTwoToneIcon from '@material-ui/icons/ReportProblemTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import BackspaceTwoToneIcon from '@material-ui/icons/BackspaceTwoTone';
import events from '@/events';

import style from './style';

function Alerts(oProps: any): any {
  let oClasses: any = style(void 0);

  let [oState, cSetState] = React.useState<any>({
    open: false,
    code: 0,
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

  let dCodesToTitles = {
    '2': '成功', // success
    '1': '资讯', // info
    '0': '', //
    '-1': '警告', // warning
    '-2': '错误', // error
    '-3': '严重' // critical
  };

  let dCodesToIcons = {
    '2': CheckCircleTwoToneIcon, // success
    '1': InfoTwoToneIcon, // info
    '0': '', //
    '-1': ReportProblemTwoToneIcon, // warning
    '-2': CancelTwoToneIcon, // error
    '-3': BackspaceTwoToneIcon // critical
  };

  let sTitle = dCodesToTitles[oState.code] ?? '';
  let Icon = dCodesToIcons[oState.code] ?? <></>;
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

  return oState.code && oState.message ? (
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
        className={clsx(oClasses.alert, {
          [oClasses.successAlert]: oState.code == 2,
          [oClasses.infoAlert]: oState.code == 1,
          [oClasses.warningAlert]: oState.code == -1,
          [oClasses.errorAlert]: oState.code == -2,
          [oClasses.criticalAlert]: oState.code == -3
        })}
        icon={<Icon />}
        onClose={cHandleClose}
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
