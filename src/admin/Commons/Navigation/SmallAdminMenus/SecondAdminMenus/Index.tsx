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
import utilities from '@/admin/utilities';

import Components from '@/admin/Components/Index';

import ThirdAdminMenus from './ThirdAdminMenus/Index';

import cStyle from './style';

function SecondAdminMenus(oProps: any) {

  let aAdminMenus = oProps.adminMenus ?? [];
  let bOpen = oProps.open;
  let oAnchor = oProps.anchor;
  let cOnClickAway = oProps.onClickAway;

  let oClasses = cStyle();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let [oStateAdminMenus, cSetStateAdminMenus] = useState<any>({});

  let cOnClick = (oAdminMenu: any) => {
    return (oEvent) => {
      let sKey = utilities.adminMenuKey(oAdminMenu);

      let oAdminMenus = {};

      if (!oStateAdminMenus[sKey]) {
        oAdminMenus = {
          [sKey]: true
        };
      }
      if (!oAdminMenu?.adminMenus || oAdminMenu?.adminMenus?.length == 0) {
        events.emit('Navigation-onClickAdminMenu', oAdminMenu);
      }

      cSetStateAdminMenus(oAdminMenus);
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
                      <Components.Icon name={oAdminMenu?.icon || 'DragHandleIcon'} />
                    </ListItemIcon>
                    <ListItemText primary={oAdminMenu.name} />
                    {!oAdminMenu?.adminMenus ||
                    !Array.isArray(oAdminMenu?.adminMenus) ||
                    oAdminMenu?.adminMenus?.length == 0 ? (
                      ''
                    ) : !oStateAdminMenus?.[utilities.adminMenuKey(oAdminMenu)] ? (
                      <ExpandMore />
                    ) : (
                      <ExpandLess />
                    )}
                  </MenuItem>
                  {oAdminMenu?.adminMenus &&
                  Array.isArray(oAdminMenu?.adminMenus) &&
                  oAdminMenu?.adminMenus?.length >= 1 ? (
                    <ThirdAdminMenus
                      in={oStateAdminMenus?.[utilities.adminMenuKey(oAdminMenu)]}
                      adminMenus={oAdminMenu.adminMenus}></ThirdAdminMenus>
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

export default SecondAdminMenus;
