import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Components from '@/Components';

import CONFIGS from '@/CONFIGS/';

import cStyle from './style';

function ThirdMenus(oProps: any) {
  const oClasses = cStyle();
  let aMenus = oProps.menus || []; // 二级 menu
  let bOpen = oProps.open;
  let oAnchor = oProps.anchor;
  let cOnClickAway = oProps.onClickAway;

  {
    /* NOTE: 如果位置太低， Popper.placement 改为 right end */
  }

  return (
    <Popper open={bOpen} anchorEl={oAnchor} role={undefined} placement={'right-start'}>
      {
        // Grow.style.transforOrigin: 动画开始的起点
        <Grow in={true} style={{ transformOrigin: 'left top' }}>
          <Paper className={oClasses.papper}>
            <ClickAwayListener onClickAway={cOnClickAway}>
              <MenuList autoFocusItem={bOpen} id="menu-list-grow">
                {aMenus.map((oMenu: any, iIndex: any) => (
                  <MenuItem key={oMenu.id}>
                    <ListItemIcon className={oClasses.listItemIcon}>
                      <Components.Admin.Icon name={oMenu.icon} />
                    </ListItemIcon>
                    <ListItemText primary={oMenu.text} />
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      }
    </Popper>
  );
}

export default ThirdMenus;
