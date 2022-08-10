import React, { useContext } from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import events from '@/events';
import Contexts from '@/Contexts';
import Components from '@/Components';

import CONFIGS from '@/CONFIGS/';

import cStyle from './style';

function Dropdown(oProps: any) {
  let oClasses = cStyle();
  let iIndex = oProps.index ?? -1;

  let bOpen = oProps.open ?? false;
  let oAnchor = oProps.anchor ?? null;
  let oTab = oProps.tab ?? null;
  let cOnClickAway = oProps.onClickAway ?? (() => void 0);
  let cHandleRemoveTab = oProps.onRemoveTab ?? (() => void 0);
  let cHandleRemoveOtherTabs = oProps.onRemoveOtherTabs ?? (() => void 0);
  let cHandleRemoveAllTabs = oProps.onRemoveAllTabs ?? (() => void 0);

  let cOnClick = (oTab: any) => {
    return (oTab: any) => {};
  };

  return (
    <Popper className={oClasses.root} open={bOpen} anchorEl={oAnchor} role={undefined} placement={'bottom-end'}>
      <Grow in={true} style={{ transformOrigin: 'right top' }}>
        <Paper className={oClasses.papper}>
          <ClickAwayListener onClickAway={cOnClickAway}>
            <MenuList id="menu-list-for-tab">
              <MenuItem onClick={cHandleRemoveTab} className={oClasses.menuItem}>
                <ListItemText primary={'关闭当前'} />
              </MenuItem>
              <MenuItem onClick={cHandleRemoveOtherTabs}>
                <ListItemText primary={'关闭其他'} />
              </MenuItem>
              <MenuItem onClick={cHandleRemoveAllTabs}>
                <ListItemText primary={'关闭全部'} />
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    </Popper>
  );
}

export default Dropdown;
