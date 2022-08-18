import React, { useContext } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Popover from '@material-ui/core/Popover';
import Components from '@/Components';
import events from '@/events/index';
import Contexts from '@/Contexts/Index';

import CONFIGS from '@/CONFIGS/INDEX';
import SecondMenus from './SecondMenus/Index';

import cStyle from './style';

function SmallMenus(oProps) {
  let oClasses = cStyle();

  let iIndex = useContext(Contexts.Admin.AppsIndex) ?? -1;

  let bStatus = oProps.status;
  let aMenus = oProps.menus || [];

  let [oState, cSetState] = React.useState<any>({
    anchors: {}
  });

  let cHandleMouseEnter = (oMenu) => {
    return (oEvent) => {
      let oAnchors = {};

      if (!oState.anchors[oMenu.id]) {
        oAnchors = {
          [oMenu.id]: oEvent.currentTarget
        };
      }
      if (!Object.prototype.hasOwnProperty.call(oMenu, 'menus') || oMenu.menus.length == 0) {
        if (-1 == iIndex) {
          events.admin.emit('Navigation-onPreClickMenu', oMenu);

          return;
        }
        events.admin.emit('Navigation-onClickMenu', oMenu);
      }
      cSetState({ ...oState, anchors: oAnchors });
    };
  };

  let cHandleMouseLeave = (oMenu) => {
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
              open={oState.anchors[oMenu.id] !== undefined}
              menus={oMenu.menus}
              anchor={oState.anchors[oMenu.id]}
              index={iIndex}
              onClickAway={cHandleClose}
              onMouseLeave={cHandleMouseLeave(oMenu)}></SecondMenus>
          </ListItem>
        </>
      ))}
    </List>
  );
}

export default SmallMenus;
