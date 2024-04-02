import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Contexts from '@/admin/Contexts/Index';

import CONFIGS from '@/CONFIGS/INDEX';

import Apps from './Apps/Index';
import Icon from './Icon/Index';

import cStyle from './style';

function LargeApps(oProps) {

  let bStatus = oProps.status ?? false; // 简单菜单 or 非简单菜单
  let aMenus = oProps.menus ?? [];
  let aApps = oProps.apps ?? [];

  const iIndex = useContext(Contexts.AppsIndex) ?? -1;
  const oClasses = cStyle();

  let [oState, cSetState] = useState<any>({
    open: false
  });

  let oApp = aApps[iIndex] ?? {};
  let cHandleToggle = (oEvent) => {
    let bOpen = !oState.open;
    cSetState({ ...oState, open: bOpen });
  };

  let aIconColors = [
    oClasses.backgroundColor1,
    oClasses.backgroundColor2,
    oClasses.backgroundColor3,
    oClasses.backgroundColor4,
    oClasses.backgroundColor5,
    oClasses.backgroundColor6,
    oClasses.backgroundColor7,
    oClasses.backgroundColor8,
    oClasses.backgroundColor9,
    oClasses.backgroundColor10,
    oClasses.backgroundColor11,
    oClasses.backgroundColor12,
    oClasses.backgroundColor13,
    oClasses.backgroundColor14,
    oClasses.backgroundColor15
  ];

  let iColor = iIndex % aIconColors.length;

  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={clsx(oClasses.root, {
        [oClasses.hidden]: !bStatus
      })}>
      <>
        <ListItem className={oClasses.listItem} button onClick={cHandleToggle}>
          <Icon
            className={clsx(aIconColors[iColor] ?? aIconColors[14])}
            title={oApp?.['title'] ?? ''}
            status={iIndex >= 0}></Icon>
          <ListItemText primary={'应用程序'} />
          {oState.open ? <ExpandLess className={oClasses.icon} /> : <ExpandMore className={oClasses.icon} />}
        </ListItem>
        <Apps in={oState.open} apps={aApps} index={iIndex} iconColors={aIconColors}></Apps>
      </>
    </List>
  );
}

export default LargeApps;
