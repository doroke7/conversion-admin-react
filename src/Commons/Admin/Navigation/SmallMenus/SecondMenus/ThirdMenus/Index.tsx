import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Contexts from '@/Contexts/Index';

import Helpers from '@/Helpers/Index';
import events from '@/events/index';

import Components from '@/Components/Index';

import cStyle from './style';

function SecondMenus(oProps: any) {
  const oClasses = cStyle();
  let oHistory = useHistory();
  let iIndex = useContext(Contexts.Admin.AppsIndex) ?? -1;
  let bIn = oProps.in ?? false;
  let aMenus = oProps.menus ?? [];

  let [oState, cSetState] = React.useState<any>({
    anchors: {}
  });

  let cHandleClick = (oMenu: any) => {
    return (oEvent: any) => {
      let oAnchor = oEvent.currentTarget;
      let oAnchors = {
        [oMenu.id]: oAnchor
      };
      cSetState({ ...oState, anchors: oAnchors });

      let oQuery = {};
      let oOption = {
        limit: 10,
        page: 1,
        app_id: 1
      };

      if (!Object.prototype.hasOwnProperty.call(oMenu, 'menus') || oMenu.menus.length == 0) {
        if (-1 == iIndex) {
          events.admin.emit('Navigation-onPreClickMenu', oMenu);

          return;
        }
        events.admin.emit('Navigation-onClickMenu', oMenu);
      }
    };
  };

  return (
    <Collapse in={bIn} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {aMenus.map((oMenu: any, iSecondIndex: any) => (
          // NOTE： 解决 多个 refs 办法 一： 宣告多一个子 child compoment , 此 compoent 有独立的 ref varible
          <ListItem
            button
            key={oMenu.id}
            className={oClasses.nested}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleClick(oMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Admin.Icon name={oMenu.icon} />
            </ListItemIcon>
            <ListItemText primary={oMenu.text} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}

export default SecondMenus;
