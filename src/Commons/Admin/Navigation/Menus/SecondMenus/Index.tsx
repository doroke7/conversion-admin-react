import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import CONFIGS from '@/CONFIGS/';

import cStyle from './style';

function SecondMenus(oProps: any) {
  const oClasses = cStyle();
  let oAnchorRef = React.useRef<HTMLButtonElement>(null);

  let [oState, cSetState] = React.useState<any>({
    open: false,
    menus: {}
  });

  let handleToggle = () => {
    cSetState({ ...oState, open: !oState.open });
  };

  let bIn = oProps.in;
  let aMenus = oProps.menus;

  return (
    <Collapse in={bIn} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {aMenus.map((oSecondMenu: any, iSecondIndex: any) => (
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <ListItem button className={oClasses.nested} key={oSecondMenu.id}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={oSecondMenu.text} />
              {oSecondMenu.menus !== undefined ? <ArrowRightIcon></ArrowRightIcon> : ''}
            </ListItem>
          </Button>
        ))}
      </List>
    </Collapse>
  );
}

export default SecondMenus;
