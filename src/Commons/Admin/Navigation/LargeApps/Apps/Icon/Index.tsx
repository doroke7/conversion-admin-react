import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';

import cStyle from './style';

function Icon(oProps: any) {
  const oClasses = cStyle();
  let sClassName = oProps.className || '';

  let sName = oProps.name || '';
  return <Avatar className={clsx(oClasses.root, sClassName)}>{sName}</Avatar>;
}

export default Icon;
