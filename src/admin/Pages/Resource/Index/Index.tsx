import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import Commons from '@/admin/Commons';
import wrappers from '@/admin/wrappers';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();

  let aRoutes = oProps.routes ?? [];

  return (
    // <Fade> 效果，必须字元素只有一个
    <Fade in={true} timeout={200}>
      <div></div>
    </Fade>
  );
}
export default wrappers.authenticator(wrappers.tab(wrappers.title(Index)));
