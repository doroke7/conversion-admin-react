import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
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

import CONFIGS from '@/CONFIGS/INDEX';

import cStyle from './style';

function ThirdMenus(oProps: any) {
  let aAdminMenus = oProps.adminMenus ?? [];
  let bOpen = oProps.open ?? false;
  let oAnchor = oProps.anchor ?? null;
  let cOnClickAway = oProps.onClickAway ?? (() => void 0);

  let oClasses = cStyle();

  let iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let cOnClick = (oAdminMenu: any) => {
    return (oEvent: any) => {


      if (!oAdminMenu?.['menus'] || oAdminMenu.menus.length == 0) {

        events.emit('Navigation-onClickMenu', oAdminMenu);
      }
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
                <MenuItem key={oAdminMenu.id} onClick={cOnClick(oAdminMenu)}>
                  <ListItemIcon className={oClasses.listItemIcon}>
                    <Components.Icon name={oAdminMenu.icon} />
                  </ListItemIcon>
                  <ListItemText primary={oAdminMenu.text} />
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    </Popper>
  );
}

export default ThirdMenus;
