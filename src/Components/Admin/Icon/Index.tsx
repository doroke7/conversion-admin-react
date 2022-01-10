import React from 'react';

import CONFIGS from '@/CONFIGS/';
import style from './style';

function Icon(oProps: any) {
  let sName = oProps.name;
  let oClasses: any = style(void 0);
  let Result = <></>;
  Result = CONFIGS.MENUS['AppsRoundedIcon'];
  return Result;
}
export default Icon;
