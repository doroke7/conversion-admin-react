import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Bar from './Bar/Index';
import LargeMenus from './LargeMenus/Index';
import SmallMenus from './SmallMenus/Index';
import Tabs from './Tabs/Index';

import context from '@/contexts';
import events from '@/events';
import utilities from '@/utilities';

import Helpers from '@/Helpers';
import CONFIGS from '@/CONFIGS/';

import style from './style';

let oMenus = utilities.deTree(CONFIGS.MENUS, 'menus', 'object', 'path');

function Navigation(oProps: any) {
  let sPathname = oProps.location.pathname;
  let oMenus = utilities.deTree(CONFIGS.MENUS, 'menus', 'object', 'path');

  let oClasses = style(void 0);

  const [oState, cSetState] = React.useState<any>({
    open: true,
    value: 0, // 当下被 Selected 的 Tab
    tabs: [] // Tab 列表
  });

  useEffect(() => {
    let cClickLink = (oLink) => {
      let aTabsOfStateRows = oState.tabs;
      let aTabs = [...oState.tabs];

      let oTabOfLink = {
        id: oLink.id,
        path: oLink.path,
        query: '',
        text: oLink.text,
        icon: oLink.icon,
        content: oLink.description
      };
      let iValue = oState.value;
      let bExist = false;
      if (aTabsOfStateRows.length >= 1) {
        for (let iIndex = 0; iIndex < aTabsOfStateRows.length; iIndex++) {
          if (aTabsOfStateRows[iIndex]['id'] == oTabOfLink['id']) {
            iValue = iIndex;
            bExist = true;
            break;
          }
        }
      }

      if (bExist) {
        // DO NOTHING
      }
      if (!bExist) {
        aTabs = aTabs.concat(oTabOfLink);
        iValue = aTabs.length - 1;
      }
      cSetState({ ...oState, value: iValue, tabs: aTabs });
    };

    let oEventEmitter: any = events.admin.addListener('onClickLink', cClickLink);
    // 组件销毁前移除事件监听
    return () => {
      events.admin.removeListener('onClickLink', cClickLink);
    };
  }, [oState.tabs]);

  let cHandleDrawerOpen = () => {
    cSetState({ ...oState, open: true });
  };

  let cHandleDrawerClose = () => {
    cSetState({ ...oState, open: false });
  };

  let cHandleChange = (oEvent: React.ChangeEvent<{}>, iValue: number) => {
    cSetState({ ...oState, value: iValue });
  };

  let cRemoveTab = (iIndex: number) => {
    // test
    return (oEvent) => {
      oEvent.stopPropagation();
      oEvent.preventDefault(); // 取消 a tag 取消 href

      let aTabsRows1 = oState.tabs.slice(0, iIndex);
      let aTabsRows2 = oState.tabs.slice(iIndex + 1, oState.tabs.length);
      let aTabs = aTabsRows1.concat(aTabsRows2);
      // 如果当下关闭的 tab 大于 当下启用的 tab => 当下启用的 tab 不变
      // 如果当下关闭的 tab 小于等于 当下启用的 tab => 当下启用的 tab 往前移动一个
      let iValue = 0;
      iValue = iIndex > oState.value ? oState.value : oState.value - 1;
      iValue = iValue < 0 ? 0 : iValue;
      cSetState({ ...oState, value: iValue, tabs: aTabs });
    };
  };

  let cClickMenu = (oMenu: any) => {
    // test
    return (oEvent) => {
      oEvent.stopPropagation();
      oEvent.preventDefault(); // 取消 a tag 取消 href
      let aTabsOfStateRows = oState.tabs;
      let aTabs = [...oState.tabs];
      // 如果 Menu 旗下还有子 menu 就不做事
      if (Object.prototype.hasOwnProperty.call(oMenu, 'menus') && oMenu.menus.length >= 1) {
        return;
      }
      let oTabOfMenu = {
        id: oMenu.id,
        path: oMenu.path,
        query: '',
        text: oMenu.text,
        icon: oMenu.icon,
        content: oMenu.description
      };
      let iValue = oState.value;
      let bExist = false;
      if (aTabsOfStateRows.length >= 1) {
        for (let iIndex = 0; iIndex < aTabsOfStateRows.length; iIndex++) {
          if (aTabsOfStateRows[iIndex]['id'] == oTabOfMenu['id']) {
            iValue = iIndex;
            bExist = true;
            break;
          }
        }
      }

      if (bExist) {
        // DO NOTHING
      }
      if (!bExist) {
        aTabs = aTabs.concat(oTabOfMenu);
        iValue = aTabs.length - 1;
      }

      cSetState({ ...oState, value: iValue, tabs: aTabs });
    };
  };

  return (
    <div className={oClasses.root}>
      <Bar handleDrawerOpen={cHandleDrawerOpen} open={oState.open}></Bar>
      <Drawer
        variant="permanent"
        className={clsx(oClasses.drawer, {
          [oClasses.drawerOpen]: oState.open,
          [oClasses.drawerClose]: !oState.open
        })}
        classes={{
          paper: clsx(oClasses.drawerPaper, {
            [oClasses.drawerOpen]: oState.open,
            [oClasses.drawerClose]: !oState.open
          })
        }}
        open={oState.open}>
        <div className={oClasses.toolbar}>
          <span className={oClasses.appName}>{CONFIGS.APP.NAME}</span>
          <IconButton className={oClasses.iconButton} onClick={cHandleDrawerClose}>
            <DoubleArrowIcon></DoubleArrowIcon>
            {/* 点击右边的 App-Icon */}
          </IconButton>
        </div>
        <Divider />
        <LargeMenus status={oState.open} menus={CONFIGS.MENUS} />
        <SmallMenus status={!oState.open} menus={CONFIGS.MENUS} />
        <Divider />
        <List></List>
      </Drawer>
      <main className={oClasses.content}>
        <div className={oClasses.toolbar}></div>
        <Tabs tabs={oState.tabs} value={oState.value} onRemove={cRemoveTab} onChange={cHandleChange}></Tabs>
      </main>
    </div>
  );
}

export default withRouter(Navigation);
