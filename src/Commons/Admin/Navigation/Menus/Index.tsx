import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
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

import cStyle from './style';

function Menus() {
  const oClasses = cStyle();

  let [oState, cSetState] = React.useState<any>({
    open: true
  });

  const cHandleClick = () => {
    cSetState({ ...oState, open: !oState.open });
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader" className={oClasses.root}>
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="第一" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="第二" />
      </ListItem>
      <ListItem button onClick={cHandleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="第三" />
        {oState.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={oState.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={oClasses.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default Menus;
