import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import events from '@/admin/events/index';
import Contexts from '@/admin/Contexts/Index';

import Components from '@/admin/Components/Index';

import ThirddMenus from './ThirdMenus/Index';

import cStyle from './style';

function SecondMenus(oProps: any) {

  let aAdminMenus = oProps.adminMenus ?? []; // 二级 menu
  let bOpen = oProps.open;
  let oAnchor = oProps.anchor;
  let cOnClickAway = oProps.onClickAway;

  let oClasses = cStyle();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let [oState, cSetState] = useState<any>({
    menus: {}
  });

  let cOnClick = (oAdminMenu: any) => {
    return (oEvent) => {
      let oAdminMenus = {};

      if (!oState.menus[oAdminMenu.id]) {
        oAdminMenus = {
          [oAdminMenu.id]: true
        };
      }
      if (!oAdminMenu?.['menus'] || oAdminMenu.menus.length == 0) {

        events.emit('Navigation-onClickMenu', oAdminMenu);
      };
      
      cSetState({ ...oState, menus: oAdminMenus });
   
    };
  };

  {
    /* NOTE: 如果位置太低， Popper.placement 改为 right end */
  }

  return (
    <Popper open={bOpen} anchorEl={oAnchor} role={undefined} placement={'right-start'}>
      <Grow in={true} style={{ transformOrigin: 'left top' }}>
        <Paper className={oClasses.papper}>
          <ClickAwayListener onClickAway={cOnClickAway}>
            <MenuList autoFocusItem={bOpen} id="menu-list-grow">
              {aAdminMenus.map((oAdminMenu: any, iIndex: any) => (
                <>
                  <MenuItem key={oAdminMenu.id} onClick={cOnClick(oAdminMenu)}>
                    <ListItemIcon className={oClasses.listItemIcon}>
                      <Components.Icon name={oAdminMenu.icon} />
                    </ListItemIcon>
                    <ListItemText primary={oAdminMenu.text} />
                    {oAdminMenu.menus === undefined ? (
                      ''
                    ) : oState.menus[oAdminMenu.id] === undefined ? (
                      <ExpandMore />
                    ) : (
                      <ExpandLess />
                    )}
                  </MenuItem>
                  {oAdminMenu.menus !== undefined ? (
                    <ThirddMenus in={oState.menus[oAdminMenu.id] !== undefined} adminMenus={oAdminMenu.menus}></ThirddMenus>
                  ) : (
                    ''
                  )}
                </>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    </Popper>
  );
}

export default SecondMenus;
