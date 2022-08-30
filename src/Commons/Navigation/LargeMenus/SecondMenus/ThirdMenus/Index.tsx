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
import events from '@/events/index';
import Contexts from '@/Contexts/Index';
import Components from '@/Components/Index';

import CONFIGS from '@/CONFIGS/INDEX';

import cStyle from './style';

function ThirdMenus(oProps: any) {
  let oClasses = cStyle();

  let iIndex = useContext(Contexts.AppsIndex) ?? -1;
  let aMenus = oProps.menus ?? [];
  let bOpen = oProps.open ?? false;
  let oAnchor = oProps.anchor ?? null;
  let cOnClickAway = oProps.onClickAway ?? (() => void 0);

  let cOnClick = (oMenu: any) => {
    return (oEvent: any) => {
      let oQuery = {};
      let oOption = {
        limit: 10,
        page: 1,
        app_id: 1
      };

      if (!Object.prototype.hasOwnProperty.call(oMenu, 'menus') || oMenu.menus.length == 0) {
        if (-1 == iIndex) {
          events.emit('Navigation-onPreClickMenu', oMenu);

          return;
        }
        events.emit('Navigation-onClickMenu', oMenu);
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
              {aMenus.map((oMenu: any, iIndex: any) => (
                <MenuItem key={oMenu.id} onClick={cOnClick(oMenu)}>
                  <ListItemIcon className={oClasses.listItemIcon}>
                    <Components.Icon name={oMenu.icon} />
                  </ListItemIcon>
                  <ListItemText primary={oMenu.text} />
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
