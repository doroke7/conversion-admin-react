import React, { useContext } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Components from '@/Components/Index';
import events from '@/events/index';
import Contexts from '@/Contexts/Index';

import CONFIGS from '@/CONFIGS/INDEX';

import SecondMenus from './SecondMenus/Index';

import cStyle from './style';

function LargeMenus(oProps) {
  let oClasses = cStyle();

  let iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let bStatus = oProps.status;
  let aMenus = oProps.menus || [];

  let [oState, cSetState] = React.useState<any>({
    menus: {}
  });

  let cHandleClick = (oMenu) => {
    return (oEvent) => {
      let oMenus = {};

      if (!oState.menus[oMenu.id]) {
        oMenus = {
          [oMenu.id]: true
        };
      }
      if (!Object.prototype.hasOwnProperty.call(oMenu, 'menus') || oMenu.menus.length == 0) {
        if (-1 == iIndex) {
          events.emit('Navigation-onPreClickMenu', oMenu);

          return;
        }
        events.emit('Navigation-onClickMenu', oMenu);
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
              <Components.Icon name={oMenu.icon}></Components.Icon>
            </ListItemIcon>
            <ListItemText primary={oMenu.text} />
            {oMenu.menus === undefined ? (
              ''
            ) : oState.menus[oMenu.id] === undefined ? (
              <ExpandMore className={oClasses.icon} />
            ) : (
              <ExpandLess className={oClasses.icon} />
            )}
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
