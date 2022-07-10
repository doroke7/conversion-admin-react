import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Helpers from '@/Helpers';

import Components from '@/Components';

import ThirdMenus from './ThirdMenus/Index';

import cStyle from './style';

function SecondMenus(oProps: any) {
  const oClasses = cStyle();
  let oHistory = useHistory();
  let bIn = oProps.in;
  let aMenus = oProps.menus;

  let [oState, cSetState] = React.useState<any>({
    open: false,
    anchor: null,
    menus: {}
  });

  let cHandleToggle = (oMenu: any) => {
    return (oEvent: any) => {
      let oMenus = {
        [oMenu.id]: true
      };
      let oAnchor = oEvent.currentTarget;
      cSetState({ ...oState, menus: oMenus, anchor: oAnchor });

      let oQuery = {};
      let oOption = {
        limit: 10,
        page: 1,
        app_id: 1
      };

      if (oMenu.path !== undefined && oMenu.menus === undefined) {
        Helpers.History.push(oHistory, oMenu.path, oQuery, oOption);
      }
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
        {aMenus.map((oMenu: any, iSecondIndex: any) => (
          // NOTE： 解决 多个 refs 办法 一： 宣告多一个子 child compoment , 此 compoent 有独立的 ref varible
          <ListItem
            button
            key={oMenu.id}
            className={oClasses.nested}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={cHandleToggle(oMenu)}>
            <ListItemIcon className={oClasses.listItemIcon}>
              <Components.Admin.Icon name={oMenu.icon} />
            </ListItemIcon>
            <ListItemText primary={oMenu.text} />
            {oMenu.menus !== undefined ? <ArrowRightIcon /> : ''}
            {oMenu.menus !== undefined ? (
              <ThirdMenus
                open={oState.menus[oMenu.id] !== undefined}
                menus={oMenu.menus}
                index={iSecondIndex}
                anchor={oState.anchor}
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
