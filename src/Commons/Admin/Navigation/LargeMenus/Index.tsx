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

import SecondMenus from './SecondMenus/Index';

import cStyle from './style';

function LargeMenus(oProps) {
  let bStatus = oProps.status;
  let aMenus = oProps.menus || [];

  const oClasses = cStyle();

  let [oState, cSetState] = React.useState<any>({
    menus: {}
  });

  const cHandleClick = (oMenu) => {
    return (oEvent) => {
      let oMenus = {};

      if (!oState.menus[oMenu.id]) {
        oMenus = {
          [oMenu.id]: true
        };
      }
      if (!Object.prototype.hasOwnProperty.call(oMenu, 'menus') || oMenu.menus.length == 0) {
        events.admin.emit('Navigation-onClickMenu', oMenu);
      }

      cSetState({ ...oState, menus: oMenus });
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
          <ListItem className={oClasses.listItem} button onClick={cHandleClick(oMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Admin.Icon name={oMenu.icon}></Components.Admin.Icon>
            </ListItemIcon>
            <ListItemText primary={oMenu.text} />
            {oMenu.menus === undefined ? '' : oState.menus[oMenu.id] === undefined ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
          {oMenu.menus !== undefined ? (
            <SecondMenus in={oState.menus[oMenu.id] !== undefined} menus={oMenu.menus}></SecondMenus>
          ) : (
            ''
          )}
        </>
      ))}
    </List>
  );
}

export default LargeMenus;
