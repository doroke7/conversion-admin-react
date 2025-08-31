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
import utilities from '@/admin/utilities';
import CONFIGS from '@/CONFIGS/INDEX';

import SecondAdminMenus from './SecondAdminMenus/Index';

import cStyle from './style';

function LargeAdminMenus(oProps: any) {
  let bStatus = oProps.status;
  let aAdminMenus = oProps.adminMenus || [];
  let iAppId = oProps.appId || 0;

  let oClasses = cStyle();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;
  let [oStateAdminMenus, cSetStateAdminMenus] = useState<any>({});

  let cHandleClick = (oAdminMenu) => {
    return (oEvent) => {
      let oAdminMenus = {};

      let sKey = utilities.adminMenuKey(oAdminMenu);
      if (!oStateAdminMenus[sKey]) {
        oAdminMenus = {
          [sKey]: true
        };
      }
      if (!oAdminMenu?.adminMenus || oAdminMenu.adminMenus.length == 0) {
        events.emit('Navigation-onClickAdminMenu', oAdminMenu);
      }

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
              <Components.Icon name={oAdminMenu?.icon || 'LineWeightIcon'}></Components.Icon>
            </ListItemIcon>
            <ListItemText primary={oAdminMenu?.name ?? ''} />
            {!oAdminMenu?.adminMenus || !Array.isArray(oAdminMenu?.adminMenus) || oAdminMenu?.adminMenus.length == 0 ? (
              ''
            ) : !oStateAdminMenus?.[utilities.adminMenuKey(oAdminMenu)] ? (
              <ExpandMore className={oClasses.icon} />
            ) : (
              <ExpandLess className={oClasses.icon} />
            )}
          </ListItem>
          {oAdminMenu?.adminMenus && Array.isArray(oAdminMenu?.adminMenus) && oAdminMenu?.adminMenus.length >= 1 ? (
            <SecondAdminMenus
              in={oStateAdminMenus?.[utilities.adminMenuKey(oAdminMenu)]}
              adminMenus={oAdminMenu.adminMenus} appId={iAppId}></SecondAdminMenus>
          ) : (
            ''
          )}
        </>
      ))}
    </List>
  );
}

export default LargeAdminMenus;
