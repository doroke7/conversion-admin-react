import React, { useContext, useState, useMemo, useLayoutEffect } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Contexts from '@/admin/Contexts/Index';
import events from '@/admin/events/index';

import CONFIGS from '@/CONFIGS/INDEX';

import Apps from './Apps/Index';
import Icon from './Icon/Index';

import cStyle from './style';

function LargeApps(oProps: any) {
  let bStatus = oProps.status ?? false; // 简单菜单 or 非简单菜单
  let bOpen = oProps.open ?? false; // 简单菜单 or 非简单菜单
  let aApps = oProps.apps ?? [];
  let cToggle = oProps?.onToggle ?? (() => ( void 0));

  let aBackgroundClasses = oProps.backgroundClasses ?? [];

  let iIndex = (useContext(Contexts.AppsIndex) ?? -1) as number;
  let oClasses = cStyle();

  let oApp = aApps?.[iIndex] ?? {};


  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={clsx(oClasses.root, {
        [oClasses.hidden]: !bStatus
      })}>
      <>
        <ListItem className={oClasses.listItem} button onClick={cToggle}>
          <Icon
            className={clsx(aBackgroundClasses?.[iIndex] ?? aBackgroundClasses?.[14])}
            title={oApp?.title ?? ''}
            status={iIndex >= 0}
            url={oApp?.url ?? ''}></Icon>
          <ListItemText primary={'项目应用'} />
          {bOpen ? <ExpandLess className={oClasses.icon} /> : <ExpandMore className={oClasses.icon} />}
        </ListItem>
        <Apps in={bOpen} apps={aApps} index={iIndex} backgroundClasses={aBackgroundClasses}></Apps>
      </>
    </List>
  );
}

export default LargeApps;
