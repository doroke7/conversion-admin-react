import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import Components from '@/admin/Components/Index';

import cStyle from './style';

function PhoneTypeIconForCell(oParams: any) {
  let oClasses = cStyle();

  let iPhoneType = oParams.getValue(oParams.id, 'phone_type') || 0;
  let Component = () => <Components.VoidElement className={oClasses.phoneTypeIcon} />;
  Component = iPhoneType == 1 ? () => <Components.AndroidIcon className={oClasses.phoneTypeIcon} /> : Component;
  Component = iPhoneType == 2 ? () => <Components.AppleIcon className={oClasses.phoneTypeIcon} /> : Component;
  let sTitle = '';
  sTitle = iPhoneType == 1 ? '安卓设备' : sTitle;
  sTitle = iPhoneType == 2 ? '苹果设备' : sTitle;

  return iPhoneType == 1 || iPhoneType == 2 ? (
    <Tooltip title={sTitle} placement="right-end">
      <div>
        <Component></Component>
      </div>
    </Tooltip>
  ) : (
    <div>
      <Component></Component>
    </div>
  );
}

export default PhoneTypeIconForCell;
