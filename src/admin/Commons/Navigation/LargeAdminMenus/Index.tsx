import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Components from '@/admin/Components/Index';
import events from '@/admin/events/index';
import Contexts from '@/admin/Contexts/Index';

import CONFIGS from '@/CONFIGS/INDEX';

import SecondMenus from './SecondMenus/Index';

import cStyle from './style';

function LargeAdminMenus(oProps: any) {

  let bStatus = oProps.status;
  let aAdminMenus = oProps.adminMenus || [];

  let oClasses = cStyle();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;
  let [oStateAdminMenus, cSetStateAdminMenus] = useState<any>({});

  let cHandleClick = (oAdminMenu) => {
    return (oEvent) => {
      let oAdminMenus = {};

      if (!oStateAdminMenus[oAdminMenu.id]) {
        oAdminMenus = {
          [oAdminMenu.id]: true
        };
      };
      if (!oAdminMenu?.adminMenus || oAdminMenu.adminMenus.length == 0) {

        events.emit('Navigation-onClickMenu', oAdminMenu);
      };

      cSetStateAdminMenus(oAdminMenus);
    };
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={clsx(oClasses.root, {
        [oClasses.rootHidden]: !bStatus
      })}>
      {aAdminMenus.map((oAdminMenu: any, iIndex: any) => (
        <>
          <ListItem className={oClasses.listItem} button onClick={cHandleClick(oAdminMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Icon name={oAdminMenu.icon}></Components.Icon>
            </ListItemIcon>
            <ListItemText primary={oAdminMenu?.name ?? ''} />
            {!oAdminMenu?.adminMenus ? (
              ''
            ) : !oStateAdminMenus?.[oAdminMenu.id] ? (
              <ExpandMore className={oClasses.icon} />
            ) : (
              <ExpandLess className={oClasses.icon} />
            )}
          </ListItem>
          {oAdminMenu?.adminMenus ? (
            <SecondMenus in={oStateAdminMenus?.[oAdminMenu.id]} adminMenus={oAdminMenu.adminMenus}></SecondMenus>
          ) : (
            ''
          )}
        </>
      ))}
    </List>
  );
}

export default LargeAdminMenus;
