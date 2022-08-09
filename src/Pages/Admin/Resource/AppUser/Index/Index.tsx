import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';
import wrappers from '@/wrappers';
import Fade from '@material-ui/core/Fade';

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

  return <div className={oClasses.root}>APP-USER</div>;
}
export default wrappers.admin.tab(wrappers.admin.title(Index));
