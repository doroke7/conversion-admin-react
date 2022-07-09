import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';

import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import style from './style';

interface State {
  name: string;
  password: string;
  open: boolean;
  text: string;
  error: boolean;
  alertOpen: boolean;
  alertMessage: string;
}

function Index(oProps: any): any {
  let oClasses: any = style(void 0);

  // 全局跳转改写地方
  // redirect();

  return <div className={oClasses.pannel}>AppUser-Index</div>;
}
export default Index;
