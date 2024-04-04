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

import CONFIGS from '@/CONFIGS/INDEX';
import SecondMenus from './SecondMenus/Index';

import cStyle from './style';

function SmallAdminMenus(oProps) {
  let bStatus = oProps.status;
  let aAdminMenus = oProps.adminMenus || [];

  let oClasses = cStyle();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;
  let [oState, cSetState] = useState<any>({
    anchors: {}
  });

  let cHandleMouseEnter = (oAdminMenu) => {
    return (oEvent: React.SyntheticEvent) => {
      let oAnchors = {};

      if (!oState.anchors[oAdminMenu.id]) {
        oAnchors = {
          [oAdminMenu.id]: oEvent.currentTarget
        };
      };
      if (!oAdminMenu?.['menus'] || oAdminMenu.menus.length == 0) {
        if (-1 == iIndex) {
          events.emit('Navigation-onPreClickMenu', oAdminMenu);
          return;
        };
        events.emit('Navigation-onClickMenu', oAdminMenu);
      };
      cSetState({ ...oState, anchors: oAnchors });
    };
  };

  let cHandleMouseLeave = (oAdminMenu) => {
    return (oEvent) => {
      let oAnchors = {};

      cSetState({ ...oState, anchors: oAnchors });
    };
  };

  let cHandleClose = (oEvent: any) => {
    // if (oState.achor && oState.achor.contains(oEvent.target as HTMLElement)) {
    //   return;
    // }
    let oAnchors = {};
    cSetState({ ...oState, anchors: oAnchors });
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
              <Components.Icon name={oAdminMenu.icon}></Components.Icon>
            </ListItemIcon>
            <SecondMenus
              open={oState.anchors[oAdminMenu.id] !== undefined}
              adminMenus={oAdminMenu.menus}
              anchor={oState.anchors[oAdminMenu.id]}
              index={iIndex}
              onClickAway={cHandleClose}
              onMouseLeave={cHandleMouseLeave(oAdminMenu)}></SecondMenus>
          </ListItem>
        </>
      ))}
    </List>
  );
}

export default SmallAdminMenus;
