import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import cStyle from './style';

function UnknownIcon(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';

  return <div>-</div>;
}

export default UnknownIcon;
