import React, { useContext } from 'react';
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
import events from '@/events/index';
import Contexts from '@/Contexts/Index';

import Components from '@/Components';

import CONFIGS from '@/CONFIGS/INDEX';
import ThirddMenus from './ThirdMenus/Index';

import cStyle from './style';

function SecondMenus(oProps: any) {
  const oClasses = cStyle();
  let iIndex = useContext(Contexts.Admin.AppsIndex) ?? -1;

  let aMenus = oProps.menus || []; // 二级 menu
  let bOpen = oProps.open;
  let oAnchor = oProps.anchor;
  let cOnClickAway = oProps.onClickAway;

  let [oState, cSetState] = React.useState<any>({
    menus: {}
  });

  let cOnClick = (oMenu: any) => {
    return (oEvent) => {
      let oMenus = {};

      if (!oState.menus[oMenu.id]) {
        oMenus = {
          [oMenu.id]: true
        };
      }
      if (!Object.prototype.hasOwnProperty.call(oMenu, 'menus') || oMenu.menus.length == 0) {
        if (-1 == iIndex) {
          events.admin.emit('Navigation-onPreClickMenu', oMenu);

          return;
        }
        events.admin.emit('Navigation-onClickMenu', oMenu);
      }
      cSetState({ ...oState, menus: oMenus });
      // if (oSecondMenu.path !== undefined && oSecondMenu.menus === undefined) {
      //   Helpers.History.push(oHistory, oSecondMenu.path, oQuery, oOption);
      // }
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
                <>
                  <MenuItem key={oMenu.id} onClick={cOnClick(oMenu)}>
                    <ListItemIcon className={oClasses.listItemIcon}>
                      <Components.Admin.Icon name={oMenu.icon} />
                    </ListItemIcon>
                    <ListItemText primary={oMenu.text} />
                    {oMenu.menus === undefined ? (
                      ''
                    ) : oState.menus[oMenu.id] === undefined ? (
                      <ExpandMore />
                    ) : (
                      <ExpandLess />
                    )}
                  </MenuItem>
                  {oMenu.menus !== undefined ? (
                    <ThirddMenus in={oState.menus[oMenu.id] !== undefined} menus={oMenu.menus}></ThirddMenus>
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
