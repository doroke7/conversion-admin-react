import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Contexts from '@/admin/Contexts/Index';

import Helpers from '@/admin/Helpers/Index';
import events from '@/admin/events/index';

import Components from '@/admin/Components/Index';

import cStyle from './style';

function SecondMenus(oProps: any) {
  let bIn = oProps.in ?? false;
  let aAdminMenus = oProps.adminMenus ?? [];

  let oClasses = cStyle();
  let oHistory = useHistory();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let [oStateAnchors, cSetStateAnchors] = useState<any>({});

  let cHandleClick = (oAdminMenu: any) => {
    return (oEvent: any) => {
      let oAnchor = oEvent.currentTarget;
      let oAnchors = {
        [oAdminMenu.id]: oAnchor
      };
      cSetStateAnchors(oAnchors);
      if (!oAdminMenu?.adminMenus || oAdminMenu?.adminMenus?.length == 0) {

        events.emit('Navigation-onClickMenu', oAdminMenu);
      };
    };
  };

  return (
    <Collapse in={bIn} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {aAdminMenus.map((oAdminMenu: any, iSecondIndex: any) => (
          // NOTE： 解决 多个 refs 办法 一： 宣告多一个子 child compoment , 此 compoent 有独立的 ref varible
          <ListItem
            button
            key={oAdminMenu.id}
            className={oClasses.nested}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleClick(oAdminMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Icon name={oAdminMenu.icon} />
            </ListItemIcon>
            <ListItemText primary={oAdminMenu.name} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}

export default SecondMenus;
