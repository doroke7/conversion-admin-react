import React from 'react';

import CONFIGS from '@/CONFIGS/';
import style from './style';

function Icon(oProps: any) {
  let sName = oProps.name;
  let oClassName = oProps.className;

  let oClasses: any = style(void 0);
  let Result = CONFIGS.ICONS[sName || 'AppsRoundedIcon'];
  return <Result className={oClassName} />;
}
export default Icon;
