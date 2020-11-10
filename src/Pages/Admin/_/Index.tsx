import React from 'react';
import { Admin } from '@/Commons';
import ImportantDevices from '@material-ui/icons/ImportantDevices';

import style from './style';

function _(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Navigation>
        <div className={classes.iconWrapper}>
          <div>
            <ImportantDevices className={classes.icon} />
          </div>
          <div className={classes.text}>- 管理平台 -</div>
        </div>
      </Admin.Navigation>
    </div>
  );
}
export default _;
