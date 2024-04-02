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

function LargeApps(oProps: any) {

  let bStatus = oProps.status ?? false; // 简单菜单 or 非简单菜单
  let aApps = oProps.apps ?? [];
  let aBackgroundClasses = oProps.backgroundClasses ?? [];

  const iIndex = useContext(Contexts.AppsIndex) ?? -1;
  const oClasses = cStyle();

  let [oState, cSetState] = useState<any>({
    open: false
  });

  let oApp = aApps[iIndex] ?? {};
  let cHandleToggle = (oEvent: React.SyntheticEvent) => {
    let bOpen = !oState.open;
    cSetState({ ...oState, open: bOpen });
  };

  console.log('LargeApps');
  console.log('aApps=', aApps);


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
            className={clsx(aBackgroundClasses[iIndex] ?? aBackgroundClasses[14])}
            title={oApp?.title ?? ''}
            status={iIndex >= 0}
            url={oApp?.url ?? ''}
          ></Icon>
          <ListItemText primary={'应用程序'} />
          {oState.open ? <ExpandLess className={oClasses.icon} /> : <ExpandMore className={oClasses.icon} />}
        </ListItem>
        <Apps in={oState.open} apps={aApps} index={iIndex} backgroundClasses={aBackgroundClasses}></Apps>
      </>
    </List>
  );
}

export default LargeApps;
