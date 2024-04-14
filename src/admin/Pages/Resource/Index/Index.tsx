import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Hocs from '@/admin/Hocs';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  return <div className={oClasses.root}></div>;
}
export default Hocs.authorization(Hocs.tab(Hocs.title(Index)));
