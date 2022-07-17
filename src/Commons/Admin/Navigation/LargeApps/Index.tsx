import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Components from '@/Components';
import events from '@/events';

import CONFIGS from '@/CONFIGS/';

import SecondMenus from './SecondMenus/Index';

import cStyle from './style';

function LargeApps(oProps) {
  let bStatus = oProps.status;
  let aMenus = oProps.menus;
  let aApps = [
    { id: 1, name: '加菲猫影视' },
    { id: 2, name: '青山影视' },
    { id: 3, name: '松鼠影视' }
  ];

  const oClasses = cStyle();

  let [oState, cSetState] = React.useState<any>({
    menus: {}
  });

  const cHandleClick = (oApp) => {
    return (oEvent) => {};
  };

  let i = 1;
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={clsx(oClasses.root, {
        [oClasses.rootHidden]: !bStatus
      })}>
      <div className={oClasses.title}>应用程序大厅</div>
      {aApps.map((oApp: any, iIndex: any) => (
        <>
          <ListItem className={oClasses.listItem} button onClick={cHandleClick(oApp)}>
            <ListItemText primary={oApp.name} />
          </ListItem>
        </>
      ))}
    </List>
  );
}

export default LargeApps;
