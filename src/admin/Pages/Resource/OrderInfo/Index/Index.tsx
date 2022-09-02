import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Fade from '@material-ui/core/Fade';
import wrappers from '@/admin/wrappers';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  return <div className={oClasses.root}>ORDER-INFO</div>;
}
export default wrappers.authenticator(wrappers.tab(wrappers.title(Index)));
