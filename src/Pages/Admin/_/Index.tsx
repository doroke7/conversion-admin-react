import React from 'react';
import Fade from '@material-ui/core/Fade';

import { Admin } from '@/Commons';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import CONFIGS from '@/CONFIGS';
import style from './style';

function _(): any {
  let oClasses: any = style(void 0);

  return (
    <Fade in={true} timeout={1000}>
      <div className={oClasses.root}>
        <Admin.Navigation></Admin.Navigation>
      </div>
    </Fade>
  );
}
export default _;
