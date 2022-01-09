import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import CONFIGS from '@/CONFIGS/';

import ThirdMenus from './ThirdMenus/Index';

import cStyle from './style';

function SecondMenus(oProps: any) {
  const oClasses = cStyle();
  let bIn = oProps.in;
  let aMenus = oProps.menus;

  let aAnchorRefs = React.useRef([]);

  let [oState, cSetState] = React.useState<any>({
    open: false,
    anchor: null,
    menus: {}
  });

  let cHandleToggle = (oSecondMenu: any) => {
    return (oEvent: any) => {
      let oMenus = {
        [oSecondMenu.id]: true
      };
      let oAnchor = oEvent.currentTarget;
      cSetState({ ...oState, menus: oMenus, anchor: oAnchor });
    };
  };

  let cHandleClose = (oEvent: any) => {
    // 如果 三级 菜单 有被锚点， 且 点击的 dom 包含 当下的 三级菜单就 不做事

    // 如果 三级 菜单 没被锚点， 且 点击的 dom 不包含 当下的 三级菜单就 关闭
    if (oState.achor && oState.achor.contains(oEvent.target as HTMLElement)) {
      return;
    }
    let oMenus = {};
    cSetState({ ...oState, menus: oMenus });
  };

  return (
    <Collapse in={bIn} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {aMenus.map((oSecondMenu: any, iSecondIndex: any) => (
          // NOTE： 解决 多个 refs 办法 一： 宣告多一个子 child compoment , 此 compoent 有独立的 ref varible
          <ListItem
            button
            key={oSecondMenu.id}
            className={oClasses.nested}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleToggle(oSecondMenu)}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={oSecondMenu.text} />
            {oSecondMenu.menus !== undefined ? <ArrowRightIcon /> : ''}
            {oSecondMenu.menus !== undefined ? (
              <ThirdMenus
                open={oState.menus[oSecondMenu.id] !== undefined}
                menus={oSecondMenu.menus}
                index={iSecondIndex}
                anchor={oState.anchor}
                onClickAway={cHandleClose}
              ></ThirdMenus>
            ) : (
              ''
            )}
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}

export default SecondMenus;
