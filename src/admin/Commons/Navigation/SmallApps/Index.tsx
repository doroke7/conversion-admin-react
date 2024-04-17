import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Components from '@/admin/Components/Index';
import events from '@/admin/events/index';
import Contexts from '@/admin/Contexts/Index';

import CONFIGS from '@/CONFIGS/INDEX';

import Apps from './Apps/Index';
import Icon from './Icon/Index';

import cStyle from './style';

function SmallApps(oProps) {
  let bStatus = oProps.status ?? false; // 简单菜单 or 非简单菜单
  let aApps = oProps.apps ?? [];
  let aBackgroundClasses = oProps.backgroundClasses ?? [];

  const oClasses = cStyle();
  const iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let [oStateAnchor, cSetStateAnchor] = useState<any>(null);

  let oApp = aApps[iIndex] ?? {};

  let cHandleMouseEnter = () => {
    return (oEvent) => {
      let oAnchor = oEvent.currentTarget;

      cSetStateAnchor(oAnchor);
    };
  };

  let cHandleMouseLeave = () => {
    return (oEvent) => {
      let oAnchor = null;

      cSetStateAnchor(oAnchor);

    };
  };

  let cHandleClose = (oEvent: any) => {
    if (oStateAnchor && oStateAnchor.contains(oEvent.target as HTMLElement)) {
      return;
    }
    let oAnchor = null;

    cSetStateAnchor(oAnchor);

  };

  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={clsx(oClasses.root, {
        [oClasses.hidden]: !bStatus
      })}>
      <>
        <ListItem
          className={oClasses.listItem}
          button
          onMouseEnter={cHandleMouseEnter()}
          onMouseLeave={cHandleMouseLeave()}>
          <Icon
            className={clsx(aBackgroundClasses?.[iIndex] ?? aBackgroundClasses[14], {})}
            title={oApp?.title ?? ''}
            status={iIndex >= 0}
            url={oApp?.url ?? ''}></Icon>
          <ListItemText primary={''} />
          <Apps
            open={Boolean(oStateAnchor)}
            apps={aApps}
            anchor={oStateAnchor}
            backgroundClasses={aBackgroundClasses}
            onClickAway={cHandleClose}
            onMouseLeave={cHandleMouseLeave()}></Apps>
        </ListItem>
      </>
    </List>
  );
}

export default SmallApps;
