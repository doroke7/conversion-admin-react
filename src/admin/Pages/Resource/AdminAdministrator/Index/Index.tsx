import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Hocs from '@/admin/Hocs';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  return <div className={oClasses.root}>ADMINISTRATOR</div>;
}
export default Hocs.authenticator(Hocs.tab(Hocs.title(Index)));
