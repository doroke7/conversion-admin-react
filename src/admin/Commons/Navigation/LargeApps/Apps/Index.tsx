import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Contexts from '@/admin/Contexts/Index';

import Helpers from '@/admin/Helpers/Index';
import Components from '@/admin/Components/Index';
import events from '@/admin/events/index';

import Icon from './Icon/Index';

import cStyle from './style';

function Apps(oProps: any) {
  let oClasses = cStyle();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;
  let bIn = oProps.in ?? false;
  let aApps = oProps.apps ?? [];
  let aBackgroundClasses = oProps.backgroundClasses ?? [];

  let [bDisableClick, cSetDisableClick] = useState(true);

  let cHandleClick:any = (iIndexOfApp, bDisableClick) => {

    console.log('bDisableClick=', bDisableClick);
 
    return (oEvent) => {
      if(bDisableClick) {
        return false;
      }
      oEvent.stopPropagation(); // 取消 link
      oEvent.preventDefault(); // 取消 a 取消 href
      events.emit('Navigation-onClickApp', iIndexOfApp);
    };
  };

  return (
    <Collapse in={bIn} timeout={5000} unmountOnExit
        onEntering={() => cSetDisableClick(true)}
        onEntered={() => cSetDisableClick(false)}
        onExit={() => cSetDisableClick(true)}
    >
      <List component="div" disablePadding className={oClasses.root}>
        {aApps.map((oApp: any, iIndexOfApp: any) => (
          <ListItem
            button
            key={oApp.id}
            className={clsx(oClasses.listItem, {
            })}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleClick(iIndexOfApp, bDisableClick)}>
            <Icon
              className={clsx(aBackgroundClasses[iIndexOfApp] ?? aBackgroundClasses[0], {})}
              title={oApp?.title ?? ''}
              status={iIndexOfApp == iIndex}
              url={oApp.url}></Icon>
            <ListItemText primary={oApp?.title ?? ''} className={oClasses.listItemText} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}

export default Apps;
