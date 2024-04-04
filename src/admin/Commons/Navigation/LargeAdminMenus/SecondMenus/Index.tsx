import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Helpers from '@/admin/Helpers/Index';

import Components from '@/admin/Components/Index';
import events from '@/admin/events/index';
import Contexts from '@/admin/Contexts/Index';
import ThirdMenus from './ThirdMenus/Index';

import style from './style';

function SecondMenus(oProps: any) {
  let oClasses = style();
  let iIndex = useContext(Contexts.AppsIndex) ?? -1;

  let bIn = oProps.in ?? false;
  let aAdminMenus = oProps.adminMenus ?? [];

  let [oState, cSetState] = useState<any>({
    anchors: {}
  });

  let cHandleToggle = (oAdminMenu: any) => {
    return (oEvent: any) => {
      let oAnchor = oEvent.currentTarget;
      let oAnchors = {
        [oAdminMenu.id]: oState.anchors[oAdminMenu.id] == null ? oAnchor : null
      };

      if (!oAdminMenu?.['menus'] || oAdminMenu.menus.length == 0) {

        events.emit('Navigation-onClickMenu', oAdminMenu);
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
        {aAdminMenus.map((oAdminMenu: any, iSecondIndex: any) => (
          // NOTE： 解决 多个 refs 办法 一： 宣告多一个子 child compoment , 此 compoent 有独立的 ref varible
          <ListItem
            button
            key={oAdminMenu.id}
            className={oClasses.listItem}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleToggle(oAdminMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Icon name={oAdminMenu.icon} />
            </ListItemIcon>
            <ListItemText primary={oAdminMenu.text} />
            {oAdminMenu.menus !== undefined ? <ArrowRightIcon /> : ''}
            {oAdminMenu.menus !== undefined ? (
              <ThirdMenus
                open={oState.anchors[oAdminMenu.id] !== undefined}
                adminMenus={oAdminMenu.menus}
                index={iSecondIndex}
                anchor={oState.anchors[oAdminMenu.id]}
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
