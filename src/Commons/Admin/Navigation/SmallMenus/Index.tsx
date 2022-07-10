import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Popover from '@material-ui/core/Popover';
import Components from '@/Components';

import CONFIGS from '@/CONFIGS/';
import SecondMenus from './SecondMenus/Index';

import cStyle from './style';

function PrimaryMenus(oProps) {
  let bStatus = oProps.status;
  let aMenus = oProps.menus;
  const oClasses = cStyle();

  let [oState, cSetState] = React.useState<any>({
    open: true,
    menus: {},
    anchors: {}
  });

  const cHandleMouseEnter = (oMenu) => {
    return (oEvent) => {
      let oAnchors = {};

      if (!oState.anchors[oMenu.id]) {
        oAnchors = {
          [oMenu.id]: oEvent.currentTarget
        };
      }
      cSetState({ ...oState, anchors: oAnchors });
    };
  };

  const cHandleMouseLeave = (oMenu) => {
    return (oEvent) => {
      let oAnchors = {};

      oAnchors = {
        [oMenu.id]: null
      };
      cSetState({ ...oState, anchors: oAnchors });
    };
  };

  const cHandlePopoverClose = (oMenu) => {
    return (oEvent) => {
      let oAnchors = {};

      oAnchors = {
        [oMenu.id]: null
      };
      cSetState({ ...oState, anchors: oAnchors });
    };
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={clsx(oClasses.root, {
        [oClasses.rootHidden]: !bStatus
      })}>
      {aMenus.map((oMenu: any, iIndex: any) => (
        <>
          <ListItem
            className={oClasses.listItem}
            button
            onMouseEnter={cHandleMouseEnter(oMenu)}
            onMouseLeave={cHandleMouseLeave(oMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Admin.Icon name={oMenu.icon}></Components.Admin.Icon>
            </ListItemIcon>
            <SecondMenus
              open={oState.menus[oMenu.id] !== undefined}
              menus={oMenu.menus}
              anchor={oState.anchors[oMenu.id]}
              index={iIndex}></SecondMenus>
          </ListItem>
        </>
      ))}
    </List>
  );
}

export default PrimaryMenus;
