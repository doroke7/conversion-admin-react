import React from 'react';
import clsx from 'clsx';

import cStyle from './style';

function UnknownIcon(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';

  return <div></div>;
}

export default UnknownIcon;
