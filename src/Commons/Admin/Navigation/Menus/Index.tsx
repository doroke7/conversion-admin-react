import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import CONFIGS from '@/CONFIGS/';

import cStyle from './style';

function Menus() {
  const oClasses = cStyle();

  let [oState, cSetState] = React.useState<any>({
    open: true,
    menus: {}
  });

  const cHandleClick = (oMenu) => {
    return (oEvent) => {
      let oMenus = {};

      if (!oState.menus[oMenu.id]) {
        oMenus = {
          [oMenu.id]: true
        };
      }
      cSetState({ ...oState, menus: oMenus });
    };
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader" className={oClasses.root}>
      {CONFIGS.MENUS.map((oMenu: any, iIndex: any) => (
        <>
          <ListItem button onClick={cHandleClick(oMenu)}>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary={oMenu.text} />
            {oMenu.menus === undefined ? '' : oState.menus[oMenu.id] === undefined ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
          {/* {JSON.stringify(oState.menus)}
          {JSON.stringify(oState.menus[oMenu.id] === undefined)} */}

          {oMenu.menus !== undefined ? (
            <Collapse in={oState.menus[oMenu.id] !== undefined} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {oMenu.menus.map((oSecondMenu: any, iSecondIndex: any) => (
                  <ListItem button className={oClasses.nested} key={oSecondMenu.id}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={oSecondMenu.text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          ) : (
            ''
          )}
        </>
      ))}
    </List>
  );
}

export default Menus;
