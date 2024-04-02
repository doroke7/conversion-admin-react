import React from 'react';
import clsx from 'clsx';
import CONFIGS from '@/CONFIGS/INDEX';

import Icon from './Icon/Index';
import style from './style';

function Empty(oProps: any) {
  let oClasses: any = style(void 0);
  let sClssName = oProps.className ?? '';

  return (
    <div className={clsx(oClasses.root, sClssName)}>
      <Icon></Icon>
      <div className={oClasses.text}>─{CONFIGS.ADMIN.NAME}─</div>
    </div>
  );
}

export default Empty;
