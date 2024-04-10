import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Popover from '@material-ui/core/Popover';
import Components from '@/admin/Components/Index';
import events from '@/admin/events/index';
import Contexts from '@/admin/Contexts/Index';
import utilities from '@/admin/utilities';

import CONFIGS from '@/CONFIGS/INDEX';
import SecondAdminMenus from './SecondAdminMenus/Index';

import cStyle from './style';

function SmallAdminMenus(oProps) {
  let bStatus = oProps.status;
  let aAdminMenus = oProps.adminMenus || [];

  let oClasses = cStyle();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let [oStateAnchors, cSetStateAnchors] = useState<any>({});

  let cHandleMouseEnter = (oAdminMenu: any) => {
    return (oEvent: React.SyntheticEvent) => {
      let oAnchors = {};
      let sKey = utilities.adminMenuKey(oAdminMenu);
      if (!oStateAnchors?.[sKey]) {
        oAnchors = {
          [sKey]: oEvent.currentTarget
        };
      }
      if (!oAdminMenu?.adminMenus || oAdminMenu?.adminMenus?.length == 0) {
        events.emit('Navigation-onClickAdminMenu', oAdminMenu);
      }
      cSetStateAnchors(oAnchors);
    };
  };

  let cHandleMouseLeave = (oAdminMenu: any) => {
    return (oEvent: React.SyntheticEvent) => {
      let oAnchors = {};
      cSetStateAnchors(oAnchors);
    };
  };

  let cHandleClose = (oEvent: any) => {
    let oAnchors = {};
    cSetStateAnchors(oAnchors);
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
          <ListItem
            className={oClasses.listItem}
            button
            onMouseEnter={cHandleMouseEnter(oAdminMenu)}
            onMouseLeave={cHandleMouseLeave(oAdminMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Icon name={oAdminMenu?.icon || 'LineWeightIcon'}></Components.Icon>
            </ListItemIcon>
            <SecondAdminMenus
              open={!!oStateAnchors?.[utilities.adminMenuKey(oAdminMenu)]}
              adminMenus={oAdminMenu?.adminMenus}
              anchor={oStateAnchors?.[utilities.adminMenuKey(oAdminMenu)]}
              index={iIndex}
              onClickAway={cHandleClose}
              onMouseLeave={cHandleMouseLeave(oAdminMenu)}></SecondAdminMenus>
          </ListItem>
        </>
      ))}
    </List>
  );
}

export default SmallAdminMenus;
