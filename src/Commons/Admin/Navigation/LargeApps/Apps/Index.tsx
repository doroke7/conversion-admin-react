import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Helpers from '@/Helpers';

import Components from '@/Components';
import events from '@/events';

import cStyle from './style';

function Apps(oProps: any) {
  const oClasses = cStyle();
  let oHistory = useHistory();
  let bIn = oProps.in || false;
  let aMenus = oProps.menus || [];
  let aApps = oProps.apps || [];

  let [oState, cSetState] = React.useState<any>({
    anchors: {}
  });

  let cHandleToggle = (oMenu: any) => {
    return (oEvent: any) => {
      let oAnchor = oEvent.currentTarget;
      let oAnchors = {
        [oMenu.id]: oState.anchors[oMenu.id] == null ? oAnchor : null
      };

      if (!Object.prototype.hasOwnProperty.call(oMenu, 'menus') || oMenu.menus.length == 0) {
        events.admin.emit('Navigation-onClickMenu', oMenu);
      }
      cSetState({ ...oState, anchors: oAnchors });
    };
  };

  return (
    <Collapse in={bIn} timeout="auto" unmountOnExit>
      <List component="div" disablePadding className={oClasses.root}>
        {aApps.map((oApp: any, iIndex: any) => (
          <ListItem
            button
            key={oApp.id}
            className={oClasses.listItem}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleToggle(oApp)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Admin.Icon name={'PhoneAndroidIcon'} />
            </ListItemIcon>
            <ListItemText primary={oApp.name} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}

export default Apps;
