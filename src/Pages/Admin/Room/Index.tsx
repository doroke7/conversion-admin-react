import React from 'react';
import { Admin } from '@/Commons';

import style from './style';

function Room(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.SideBar />
    </div>
  );
}
export default Room;
