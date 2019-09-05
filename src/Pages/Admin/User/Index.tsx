import React from 'react';
import { Admin } from '@/Commons';

import style from './style';

function User(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu >
        <div>
          USER
        </div>
      </Admin.Menu >

    </div>
  );
}
export default User;
