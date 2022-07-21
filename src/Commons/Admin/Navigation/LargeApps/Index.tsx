import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';

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
    index: -1
  });

  let cHandleToggle = (oEvent) => {
    let bOpen = !oState.open;
    cSetState({ ...oState, open: bOpen });
  };

  let cHandleClick = (iIndexOfApps: any) => {
    return (oEvent: any) => {
      cSetState({ ...oState, index: iIndexOfApps });
    };
  };

  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={clsx(oClasses.root, {
        [oClasses.hidden]: !bStatus
      })}>
      <>
        <ListItem className={oClasses.listItem} button onClick={cHandleToggle}>
          <ListItemIcon className={oClasses.listItemIcon}>
            <Components.Admin.Icon name={'PhonelinkIcon'}></Components.Admin.Icon>
          </ListItemIcon>
          <ListItemText primary={'应用程序'} />
          {oState.open ? <ExpandLess className={oClasses.icon} /> : <ExpandMore className={oClasses.icon} />}
        </ListItem>
        <Apps in={oState.open} apps={aApps} index={oState.index} onClick={cHandleClick}></Apps>
      </>
    </List>
  );
}

export default LargeApps;
