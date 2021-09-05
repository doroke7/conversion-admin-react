import React from 'react';
import { Admin } from '@/Commons';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import CONFIGS from '@/CONFIGS';
import style from './style';

function _(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Navigation>
        <div className={classes.iconWrapper}>
          <div>
            <InfoTwoToneIcon className={classes.icon} />
          </div>
          <div className={classes.text}>- {CONFIGS.APP.NAME} -</div>
        </div>
      </Admin.Navigation>
    </div>
  );
}
export default _;
