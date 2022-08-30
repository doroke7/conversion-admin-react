import React from 'react';
import { Redirect } from 'react-router-dom';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);

  return <Redirect to="/admin/authentication/authenticator/sign-in" />;
}
export default Index;
