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

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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
          <Paper>
            <ClickAwayListener onClickAway={cOnClickAway}>
              <MenuList autoFocusItem={bOpen} id="menu-list-grow">
                {aMenus.map((oMenu: any, iIndex: any) => (
                  <MenuItem key={oMenu.id}>{oMenu.text}</MenuItem>
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
