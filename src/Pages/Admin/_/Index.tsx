import React from 'react';
import { Admin } from '@/Commons';
import ImportantDevices from '@material-ui/icons/ImportantDevices';

import style from './style';

function _(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu >
        <div>
          <ImportantDevices />
        </div>
      </Admin.Menu >

    </div>
  );
}
export default _;
