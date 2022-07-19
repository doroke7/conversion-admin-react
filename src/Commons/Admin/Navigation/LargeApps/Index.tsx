import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Components from '@/Components';
import events from '@/events';

import CONFIGS from '@/CONFIGS/';

import Apps from './Apps/Index';

import cStyle from './style';

function LargeApps(oProps) {
  let bStatus = oProps.status; // 简单菜单 or 非简单菜单
  let aMenus = oProps.menus || [];
  let aApps = oProps.apps || [];

  const oClasses = cStyle();

  let [oState, cSetState] = React.useState<any>({
    open: false,
    menus: {}
  });

  const cHandleClick = (oEvent) => {
    let bOpen = !oState.open;
    cSetState({ ...oState, open: bOpen });
  };

  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={clsx(oClasses.root, {
        [oClasses.rootHidden]: !bStatus
      })}>
      <>
        <ListItem className={oClasses.listItem} button onClick={cHandleClick}>
          <ListItemIcon className={oClasses.listItemIcon}>
            <Components.Admin.Icon name={'PhonelinkIcon'}></Components.Admin.Icon>
          </ListItemIcon>
          <ListItemText primary={'应用程序'} />
          {oState.open ? <ExpandMore className={oClasses.icon} /> : <ExpandLess className={oClasses.icon} />}
        </ListItem>
        <Apps in={oState.open} apps={aApps}></Apps>
      </>
    </List>
  );
}

export default LargeApps;
