import React from 'react';

import CONFIGS from '@/CONFIGS/';
import style from './style';

function Icon(oProps: any) {
  let sName = oProps.name;
  let oClasses: any = style(void 0);
  let Result = <></>;
  let oResult = CONFIGS.ICONS[sName] || CONFIGS.ICONS['AppsRoundedIcon'];
  return Result;
}
export default Icon;
