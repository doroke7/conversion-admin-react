import React, { useContext, useState, useMemo } from 'react';
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

  let aBackgroundClasses = [
    oClasses.backgroundColor01,
    oClasses.backgroundColor02,
    oClasses.backgroundColor03,
    oClasses.backgroundColor04,
    oClasses.backgroundColor05,
    oClasses.backgroundColor06,
    oClasses.backgroundColor07,
    oClasses.backgroundColor08,
    oClasses.backgroundColor09,
    oClasses.backgroundColor10,
    oClasses.backgroundColor11,
    oClasses.backgroundColor12,
    oClasses.backgroundColor13,
    oClasses.backgroundColor14,
    oClasses.backgroundColor15
  ];

  let aMemoBackgroundClasses = useMemo(() => {
    let aResults: any[] = [];

    if (aBackgroundClasses.length >= aApps.length) {
      aResults.push(...aBackgroundClasses);
      return aResults;
    };

    if (aBackgroundClasses.length < aApps.length) {
      let iFactor = Math.ceil(aApps.length / (aBackgroundClasses.length || 1));

      for (let iIndex = 0; iIndex < iFactor; iIndex++) {

        aResults.push(...aBackgroundClasses);
      };

      return aResults;
    };

    return aResults;

  }, [aApps.length]);

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
            className={clsx(aMemoBackgroundClasses[iIndex] ?? aBackgroundClasses[14])}
            title={oApp?.['title'] ?? ''}
            status={iIndex >= 0}></Icon>
          <ListItemText primary={'应用程序'} />
          {oState.open ? <ExpandLess className={oClasses.icon} /> : <ExpandMore className={oClasses.icon} />}
        </ListItem>
        <Apps in={oState.open} apps={aApps} index={iIndex} backgroundClasses={aMemoBackgroundClasses}></Apps>
      </>
    </List>
  );
}

export default LargeApps;
