import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';

import { Admin } from '@/Commons';

import style from './style';

function Alerts(oProps: any): any {
  let oClasses: any = style(void 0);

  let iCode = oProps.code ?? 0;
  let sMessage = oProps.message ?? '';

  let dCodesToSeverities = {
    '2': 'success',
    '1': 'info',
    '0': '',
    '-1': 'warning',
    '-2': 'error'
  };

  return <Alert severity={dCodesToSeverities[iCode] ?? ''}>{sMessage}</Alert>;
}
export default Alerts;
