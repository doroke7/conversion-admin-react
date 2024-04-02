import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Components from '@/admin/Components/Index';
import events from '@/admin/events/index';
import Contexts from '@/admin/Contexts/Index';

import CONFIGS from '@/CONFIGS/INDEX';

import Apps from './Apps/Index';
import Icon from './Icon/Index';

import cStyle from './style';

function SmallApps(oProps) {

  let bStatus = oProps.status ?? false; // 简单菜单 or 非简单菜单
  let aApps = oProps.apps ?? [];
  let aBackgroundClasses = oProps.backgroundClasses ?? [];

  const oClasses = cStyle();
  const iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let [oState, cSetState] = useState<any>({
    open: false,
    anchor: null
  });

  let oApp = aApps[iIndex] ?? {};
  let cHandleToggle = (oEvent: React.SyntheticEvent) => {
    let bOpen = !oState.open;
    cSetState({ ...oState, open: bOpen });
  };

  let cHandleMouseEnter = () => {
    return (oEvent) => {
      let oAnchor = oEvent.currentTarget;

      cSetState({ ...oState, anchor: oAnchor });
    };
  };

  let cHandleMouseLeave = () => {
    return (oEvent) => {
      let oAnchor = null;

      cSetState({ ...oState, anchor: oAnchor });
    };
  };

  let cHandleClose = (oEvent: any) => {
    if (oState.achor && oState.achor.contains(oEvent.target as HTMLElement)) {
      return;
    }
    let oAnchor = null;

    cSetState({ ...oState, anchor: oAnchor });
  };

  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      className={clsx(oClasses.root, {
        [oClasses.hidden]: !bStatus
      })}>
      <>
        <ListItem
          className={oClasses.listItem}
          button
          onMouseEnter={cHandleMouseEnter()}
          onMouseLeave={cHandleMouseLeave()}>
          <Icon
            className={clsx(aBackgroundClasses?.[iIndex] ?? aBackgroundClasses[14])}
            title={oApp?.title ?? ''}
            status={iIndex >= 0}></Icon>
          <ListItemText primary={''} />
          <Apps
            open={Boolean(oState.anchor)}
            apps={aApps}
            anchor={oState.anchor}
            backgroundClasses={aBackgroundClasses}
            onClickAway={cHandleClose}
            onMouseLeave={cHandleMouseLeave()}></Apps>
        </ListItem>
      </>
    </List>
  );
}

export default SmallApps;
