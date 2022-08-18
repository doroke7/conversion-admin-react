import React from 'react';

import CONFIGS from '@/CONFIGS/';
import style from './style';

function Icon(oProps: any) {
  let sName = oProps.name;
  let oClassName = oProps.className;

  let oClasses: any = style(void 0);
  let Component = CONFIGS.ICONS[sName ?? 'AppsRoundedIcon'];
  return <Component className={oClassName} />;
}
export default Icon;
