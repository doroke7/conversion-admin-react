import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import wrappers from '@/admin/wrappers';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  return <div className={oClasses.root}></div>;
}
export default wrappers.authenticator(wrappers.tab(wrappers.title(Index)));
