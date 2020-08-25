import React from 'react';
import { Admin } from '@/Commons';
import ImportantDevices from '@material-ui/icons/ImportantDevices';

import style from './style';

function _(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu>
        <div className={classes.iconWrapper}>
          <ImportantDevices className={classes.icon} />
        </div>
        <div className={classes.text}>- 後台管理平台 -</div>
      </Admin.Menu>
    </div>
  );
}
export default _;
