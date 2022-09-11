import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import Components from '@/admin/Components/Index';

import cStyle from './style';

function AvatorForCell(oParams: any) {
  let oClasses = cStyle();

  let sVip = oParams.getValue(oParams.id, 'vip') || '';
  let sSrc = oParams.getValue(oParams.id, 'pic') || '';
  let sVipDatetime = oParams.getValue(oParams.id, 'vip_datetime') || '';
  let Icon = Components.VoidElement;
  Icon = sVip == 1 ? Components.VipIcon1 : Icon;
  Icon = sVip == 2 ? Components.VipIcon2 : Icon;
  Icon = sVip == 3 ? Components.VipIcon3 : Icon;

  let sTitle = '特权一般';
  sTitle = sVip == 1 ? '特权已过期' : sTitle;
  sTitle = sVip == 2 ? '特权直到 ' + sVipDatetime.substring(0, 10) : sTitle;
  sTitle = sVip == 3 ? '特权永久' : sTitle;

  return (
    <Tooltip title={sTitle} placement="right-end">
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        badgeContent={<Icon className={oClasses.vipIcon}></Icon>}>
        <Avatar className={oClasses.avatar}>
          <Components.Img src={sSrc}></Components.Img>
        </Avatar>
      </Badge>
    </Tooltip>
  );
}

export default AvatorForCell;
