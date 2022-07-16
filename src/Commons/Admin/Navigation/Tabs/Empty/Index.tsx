import React from 'react';
import CONFIGS from '@/CONFIGS';

import Icon from './Icon/Index';
import style from './style';

function Empty() {
  const oClasses: any = style(void 0);

  return (
    <div className={oClasses.root}>
      <Icon></Icon>
      <div className={oClasses.text}>—{CONFIGS.APP.NAME}—</div>
    </div>
  );
}

export default Empty;
