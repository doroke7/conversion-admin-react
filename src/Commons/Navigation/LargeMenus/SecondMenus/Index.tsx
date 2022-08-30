import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Helpers from '@/Helpers/Index';

import Components from '@/Components/Index';
import events from '@/events/index';
import Contexts from '@/Contexts/Index';
import ThirdMenus from './ThirdMenus/Index';

import style from './style';

function SecondMenus(oProps: any) {
  let oClasses = style();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let bIn = oProps.in ?? false;
  let aMenus = oProps.menus ?? [];

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
        if (-1 == iIndex) {
          events.emit('Navigation-onPreClickMenu', oMenu);

          return;
        }
        events.emit('Navigation-onClickMenu', oMenu);
      }
      cSetState({ ...oState, anchors: oAnchors });
    };
  };

  let cHandleClose = (oEvent: any) => {
    // 如果 三级 菜单 有被锚点， 且 点击的 dom 包含 当下的 三级菜单就 不做事

    // 如果 三级 菜单 没被锚点， 且 点击的 dom 不包含 当下的 三级菜单就 关闭
    if (oState.achor && oState.achor.contains(oEvent.target as HTMLElement)) {
      return;
    }
    let oAnchors = {};
    cSetState({ ...oState, anchors: oAnchors });
  };

  return (
    <Collapse in={bIn} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {aMenus.map((oMenu: any, iSecondIndex: any) => (
          // NOTE： 解决 多个 refs 办法 一： 宣告多一个子 child compoment , 此 compoent 有独立的 ref varible
          <ListItem
            button
            key={oMenu.id}
            className={oClasses.listItem}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleToggle(oMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Icon name={oMenu.icon} />
            </ListItemIcon>
            <ListItemText primary={oMenu.text} />
            {oMenu.menus !== undefined ? <ArrowRightIcon /> : ''}
            {oMenu.menus !== undefined ? (
              <ThirdMenus
                open={oState.anchors[oMenu.id] !== undefined}
                menus={oMenu.menus}
                index={iSecondIndex}
                anchor={oState.anchors[oMenu.id]}
                onClickAway={cHandleClose}></ThirdMenus>
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
