import React, { useContext } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Contexts from '@/Contexts/Index';

import Helpers from '@/Helpers';
import Components from '@/Components';
import events from '@/events';

import Icon from './Icon/Index';

import cStyle from './style';

function Apps(oProps: any) {
  const oClasses = cStyle();
  let oHistory = useHistory();
  let iIndex = useContext(Contexts.Admin.AppsIndex) ?? -1;
  let bIn = oProps.in ?? false;
  let aApps = oProps.apps ?? [];
  let aBackgroundClasses = oProps.iconColors ?? [];

  let cHandleClick = (iAppId) => {
    return (oEvent) => {
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a 取消 href
      events.admin.emit('Navigation-onClickApp', iAppId);
    };
  };

  return (
    <Collapse in={bIn} timeout="auto" unmountOnExit>
      <List component="div" disablePadding className={oClasses.root}>
        {aApps.map((oApp: any, iIndexOfApp: any) => (
          <ListItem
            button
            key={oApp.id}
            className={oClasses.listItem}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleClick(oApp.id)}>
            <Icon
              className={clsx(aBackgroundClasses[iIndexOfApp] ?? aBackgroundClasses[0])}
              name={oApp.name}
              status={iIndexOfApp == iIndex}></Icon>
            <ListItemText primary={oApp.name} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}

export default Apps;
