import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Fade from '@material-ui/core/Fade';
import wrappers from '@/wrappers';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  return <div className={oClasses.root}>VOD</div>;
}
export default wrappers.admin.tab(wrappers.admin.title(Index));
