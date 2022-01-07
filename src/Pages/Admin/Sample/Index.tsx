import React from 'react';
import Fade from '@material-ui/core/Fade';

import { Admin } from '@/Commons';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import CONFIGS from '@/CONFIGS';
import style from './style';

function Sample(): any {
  const oClasses: any = style(void 0);

  return (
    <Fade in={true} timeout={1000}>
      <div>SAMPLE</div>
    </Fade>
  );
}
export default Sample;
