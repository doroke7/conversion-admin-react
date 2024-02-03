import React, { useLayoutEffect, useEffect } from 'react';
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
import ReportOffTwoToneIcon from '@material-ui/icons/ReportOffTwoTone';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import events from '@/admin/events/index';

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
    '1': '成功', // success
    '0': '资讯', // info
    '-1': '注意', // notice
    '-2': '警告异常', // warning
    '-3': '程序异常', // error
    '-4': '系统异常', // fatal
    '-9999': '未知异常' // unknown
  };

  let dCodesToIcons = {
    '1': CheckCircleTwoToneIcon, // success
    '0': InfoTwoToneIcon, // info
    '-1': ReportProblemTwoToneIcon, // notice
    '-2': ReportProblemTwoToneIcon, // warning
    '-3': CancelTwoToneIcon, // error
    '-4': ReportOffTwoToneIcon, // fatal
    '-9999': HelpTwoToneIcon // unknown
  };

  let sTitle = dCodesToTitles[oState.code] ?? dCodesToTitles['-9999'];
  let Icon = dCodesToIcons[oState.code] ?? dCodesToIcons['-9999'];

  useLayoutEffect(() => {
    let cAlert = (oMessage: any) => {
      cSetState({
        ...oState,
        open: true,
        code: oMessage?.code ?? 0,
        message: oMessage?.message ?? '',
        time: oMessage?.time ?? oState.time
      });
    };
    let oEventEmitter: any = events.addListener('Alerts-onAlert', cAlert);
    return () => {
      events.removeListener('Alerts-onAlert', cAlert);
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
          [oClasses.fatalAlert]: oState.code == -3,
          [oClasses.unknownAlert]: oState.code < -3 || oState.code > 2
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
