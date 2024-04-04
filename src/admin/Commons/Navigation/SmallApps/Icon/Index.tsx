import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import GradientIcon from '@material-ui/icons/Gradient';
import LanguageIcon from '@material-ui/icons/Language';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import WidgetsIcon from '@material-ui/icons/Widgets';
import cStyle from './style';

function Icon(oProps: any) {
  const oClasses = cStyle();
  let sClassName = oProps.className ?? '';
  let bStatus = oProps.status || false;
  let sTitle = oProps.title ?? '';
  let sUrl = oProps.url ?? '';

  sTitle = sTitle.substr(0, 1);
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      className={oClasses.badge}
      badgeContent={bStatus ? <CheckBoxIcon className={oClasses.checkCircleIcon}></CheckBoxIcon> : <></>}>
      <Avatar className={clsx(oClasses.root, sClassName)} variant="rounded" src={sUrl}>
        {sTitle ? sTitle : <WidgetsIcon></WidgetsIcon>}
      </Avatar>
    </Badge>
  );
}

export default Icon;
