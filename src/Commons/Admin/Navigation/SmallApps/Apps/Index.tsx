import React from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import events from '@/events';

import Components from '@/Components';

import CONFIGS from '@/CONFIGS/';

import Icon from './Icon/Index';
import cStyle from './style';

function SecondMenus(oProps: any) {
  const oClasses = cStyle();
  let aBackgroundClasses = oProps.iconColors ?? [];

  let oHistory = useHistory();

  let aApps = oProps.apps ?? []; // 二级 menu
  let bOpen = oProps.open ?? false;
  let iIndex = oProps.index ?? -1;

  let oAnchor = oProps.anchor ?? null;
  let cOnClickAway = oProps.onClickAway ?? (() => void 0);

  let cHandleClick = (sIndex) => {
    return (oEvent) => {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a 取消 href
      events.admin.emit('Navigation-onClickApp', sIndex);
    };
  };

  return (
    <Popper open={bOpen} anchorEl={oAnchor} role={undefined} placement={'right-start'}>
      <Grow in={true} style={{ transformOrigin: 'left top' }}>
        <Paper className={oClasses.papper}>
          <ClickAwayListener onClickAway={cOnClickAway}>
            <MenuList autoFocusItem={bOpen} id="app-list-grow">
              {aApps.map((oApp: any, iIndexOfApp: any) => (
                <>
                  <MenuItem key={oApp.id} onClick={cHandleClick(iIndexOfApp)}>
                    <Icon
                      className={clsx(aBackgroundClasses[iIndexOfApp] || aBackgroundClasses[0])}
                      name={oApp.name}
                      status={iIndexOfApp == iIndex}></Icon>
                    <ListItemText primary={oApp.name} />
                  </MenuItem>
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
