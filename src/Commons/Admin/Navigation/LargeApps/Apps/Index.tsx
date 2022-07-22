import React from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Avatar from '@material-ui/core/Avatar';

import Helpers from '@/Helpers';
import Components from '@/Components';
import events from '@/events';

import Icon from './Icon/Index';

import cStyle from './style';

function Apps(oProps: any) {
  const oClasses = cStyle();
  let oHistory = useHistory();
  let bIn = oProps.in || false;
  let iIndex = oProps.index || 0;
  let aApps = oProps.apps || [];
  let cHandleClick = oProps.onClick || (() => void 0);
  let aBackgroundClasses = oProps.iconColors || [];

  return (
    <Collapse in={bIn} timeout="auto" unmountOnExit>
      <List component="div" disablePadding className={oClasses.root}>
        {aApps.map((oApp: any, iIndexOfApps: any) => (
          <ListItem
            button
            key={oApp.id}
            className={oClasses.listItem}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleClick(iIndexOfApps)}>
            <Icon
              className={clsx(aBackgroundClasses[iIndexOfApps] || aBackgroundClasses[0])}
              name={oApp.name}
              status={iIndexOfApps == iIndex}></Icon>
            <ListItemText primary={oApp.name} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}

export default Apps;
