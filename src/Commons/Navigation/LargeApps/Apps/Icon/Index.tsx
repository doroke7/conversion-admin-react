import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import cStyle from './style';

function Icon(oProps: any) {
  const oClasses = cStyle();
  let sClassName = oProps.className ?? '';
  let bStatus = oProps.status ?? false;

  let sName = oProps.name ?? '';
  sName = sName.substr(0, 1);
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      className={oClasses.badge}
      badgeContent={bStatus ? <CheckBoxIcon className={oClasses.checkCircleIcon}></CheckBoxIcon> : <></>}>
      <Avatar className={clsx(oClasses.root, sClassName)} variant="rounded">
        {sName}
      </Avatar>
    </Badge>
  );
}

export default Icon;
