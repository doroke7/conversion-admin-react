import React from 'react';
import { Admin } from '@/Commons';

import style from './style';

function Administrator(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu >
        <div>
          Administrator!!!!
        </div>
      </Admin.Menu >

    </div>
  );
}
export default Administrator;
