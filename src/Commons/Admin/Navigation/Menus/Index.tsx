import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Components from '@/Components';

import CONFIGS from '@/CONFIGS/';

import SecondMenus from './SecondMenus/Index';

import cStyle from './style';

function Menus() {
  const oClasses = cStyle();

  let [oState, cSetState] = React.useState<any>({
    open: true,
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
      cSetState({ ...oState, menus: oMenus });
    };
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader" className={oClasses.root}>
      {CONFIGS.MENUS.map((oMenu: any, iIndex: any) => (
        <>
          <ListItem button onClick={cHandleClick(oMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              {/* <Components.Admin.Icon name={oMenu.icon}></Components.Admin.Icon> */}
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

export default Menus;
