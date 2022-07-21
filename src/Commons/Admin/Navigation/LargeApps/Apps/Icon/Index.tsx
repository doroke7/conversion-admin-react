import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import cStyle from './style';

function Icon(oProps: any) {
  const oClasses = cStyle();
  let sClassName = oProps.className || '';

  let sName = oProps.name || '';
  return (
    <Badge
      overlap="rectangular"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      className={oClasses.badge}
      badgeContent={<CheckCircleIcon className={oClasses.checkCircleIcon}></CheckCircleIcon>}>
      <Avatar className={clsx(oClasses.root, sClassName)} variant="rounded">
        {sName}
      </Avatar>
    </Badge>
  );
}

export default Icon;
