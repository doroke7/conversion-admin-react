import React, { useContext } from 'react';

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

import SignOutIcon from './SignOutIcon/Index';
import cStyle from './style';

function Dropdown(oProps: any) {
  let oClasses = cStyle();

  let bOpen = oProps.open ?? false;
  let oAnchor = oProps.anchor ?? null;
  let cOnClickAway = oProps.onClickAway ?? (() => void 0);
  let cOnClick = oProps.onClick ?? (() => void 0);

  return (
    <Popper className={oClasses.root} open={bOpen} anchorEl={oAnchor} role={undefined} placement={'bottom-end'}>
      <Grow in={true} style={{ transformOrigin: 'right top' }}>
        <Paper className={oClasses.papper}>
          <ClickAwayListener onClickAway={cOnClickAway}>
            <MenuList id="menu-list-for-tab" className={oClasses.menuList}>
              <MenuItem onClick={cOnClick} className={oClasses.menuItem}>
                <ListItemIcon className={oClasses.listItemIcon}>
                  <Components.Icon name={'ExitToAppIcon'}></Components.Icon>
                </ListItemIcon>
                <ListItemText primary={'登出系统'} />
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    </Popper>
  );
}

export default Dropdown;
