import React from 'react';
import { Admin } from '@/Commons';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import CONFIGS from '@/CONFIGS';
import style from './style';

function _(): any {
  const oClasses: any = style(void 0);

  return (
    <div className={oClasses.root}>
      <Admin.Navigation>
        <div className={oClasses.iconWrapper}>
          <div>
            <InfoTwoToneIcon className={oClasses.icon} />
          </div>
          <div className={oClasses.text}>- {CONFIGS.APP.NAME} -</div>
        </div>
      </Admin.Navigation>
    </div>
  );
}
export default _;
