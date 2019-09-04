import React from 'react';
import { Admin } from '@/Commons';

import style from './style';

function Room(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu >
        <div>
          12345
        </div>
      </Admin.Menu >

    </div>
  );
}
export default Room;
