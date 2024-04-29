import React, { useLayoutEffect, useEffect, useState } from 'react';
import clsx from 'clsx';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import ReportTwoToneIcon from '@material-ui/icons/ReportTwoTone';
import ReportProblemTwoToneIcon from '@material-ui/icons/ReportProblemTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import BackspaceTwoToneIcon from '@material-ui/icons/BackspaceTwoTone';
import NotificationImportantTwoToneIcon from '@material-ui/icons/NotificationImportantTwoTone';
import ReportOffTwoToneIcon from '@material-ui/icons/ReportOffTwoTone';
import BugReportTwoToneIcon from '@material-ui/icons/BugReportTwoTone';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import events from '@/admin/events/index';

import style from './style';

function Alerts(oProps: any): any {
  let oClasses: any = style(void 0);

  let [bStateOpen, cSetStateOpen] = useState<boolean>(false);
  let [iStateCode, cSetStateCode] = useState<number>(0);
  let [sStateMessage, cSetStateMessage] = useState<string>('MESSAGE');
  let [iStateTime, cSetStateTime] = useState<number>(2000);


  let cHandleClick = () => {
    cSetStateOpen(true);
  };

  let cHandleClose = (event: React.SyntheticEvent | React.MouseEvent, sReason?: string) => {
    if (sReason === 'clickaway') {
      return;
    }

    cSetStateOpen(false);

  };

  let dCodesToTitles = {
    '1': '打印资料', // success
    '0': '成功讯息', // info
    '-1': '注意事项', // notice
    '-2': '警告异常', // warning
    '-3': '程序错误', // error
    '-4': '系统奔溃', // fatal
    '-5': '未知情形' // unknown
  };

  let dCodesToIcons = {
    '1': InfoTwoToneIcon, // debug
    '0': CheckCircleTwoToneIcon, // info for success
    '-1': NotificationImportantTwoToneIcon, // notice
    '-2': ReportProblemTwoToneIcon, // warning
    '-3': BugReportTwoToneIcon, // error
    '-4': ReportOffTwoToneIcon, // fatal
    '-5': HelpTwoToneIcon // unknown
  };

  let sTitle = dCodesToTitles['-5'];
  let Icon = dCodesToIcons['-5'];

  sTitle = dCodesToTitles[iStateCode] ?? sTitle;
  Icon = dCodesToIcons[iStateCode] ?? Icon;

  sTitle = iStateCode > 1 ? dCodesToTitles['1'] : sTitle;
  Icon = iStateCode > 1 ? dCodesToIcons['1'] : Icon;

  sTitle = iStateCode < -4 ? dCodesToTitles['-5'] : sTitle;
  Icon = iStateCode < -4 ? dCodesToIcons['-5'] : Icon;

  useLayoutEffect(() => {
    let cAlert = (oMessage: any) => {
      cSetStateOpen(true);
      cSetStateCode(oMessage?.code ?? 0);
      cSetStateMessage(oMessage?.message ?? '');
      cSetStateTime(oMessage?.time ?? iStateTime);
    };
    let oEventEmitter: any = events.addListener('Alerts-onAlert', cAlert);
    return () => {
      events.removeListener('Alerts-onAlert', cAlert);
    };
  }, []);

  return sStateMessage ? (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={bStateOpen}
      autoHideDuration={iStateTime}
      onClose={cHandleClose}
      TransitionComponent={Slide}
      action={<></>}>
      <Alert
        className={clsx(oClasses.alert, {
          [oClasses.debugAlert]: iStateCode >= 1,
          [oClasses.infoAlert]: iStateCode == 0,
          [oClasses.noticeAlert]: iStateCode == -1,
          [oClasses.warnAlert]: iStateCode == -2,
          [oClasses.errorAlert]: iStateCode == -3,
          [oClasses.fatalAlert]: iStateCode == -4,
          [oClasses.unkownAlert]: iStateCode < -4 || iStateCode > 2
        })}
        icon={<Icon />}
        onClose={cHandleClose}
        elevation={3}
        variant="filled">
        <AlertTitle className={oClasses.alertTitle}>{sTitle}</AlertTitle>
        <span className={oClasses.message}>{sStateMessage}</span>
      </Alert>
    </Snackbar>
  ) : (
    ''
  );
}
export default Alerts;

