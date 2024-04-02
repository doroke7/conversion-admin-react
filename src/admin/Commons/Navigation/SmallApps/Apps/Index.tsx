import React, { useContext } from 'react';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemText from '@material-ui/core/ListItemText';
import events from '@/admin/events/index';

import Components from '@/admin/Components/Index';
import Contexts from '@/admin/Contexts/Index';

import CONFIGS from '@/CONFIGS/INDEX';

import Icon from './Icon/Index';
import cStyle from './style';

function Apps(oProps: any) {
  const iIndex = useContext(Contexts.AppsIndex) ?? -1;

  const oClasses = cStyle();
  let aBackgroundClasses = oProps.iconColors ?? [];

  let oHistory = useHistory();

  let aApps = oProps.apps ?? []; // 二级 menu
  let bOpen = oProps.open ?? false;

  let oAnchor = oProps.anchor ?? null;
  let cOnClickAway = oProps.onClickAway ?? (() => void 0);

  let cHandleClick = (iIndexOfApp) => {
    return (oEvent) => {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a 取消 href
      events.emit('Navigation-onClickApp', iIndexOfApp);
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
                      title={oApp?.title ?? ''}
                      status={iIndexOfApp == iIndex}></Icon>
                    <ListItemText primary={oApp?.title ?? ''} />
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

export default Apps;
