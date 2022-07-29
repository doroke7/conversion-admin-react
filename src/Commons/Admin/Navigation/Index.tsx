import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Bar from './Bar/Index';
import SmallApps from './SmallApps/Index';
import LargeApps from './LargeApps/Index';
import LargeMenus from './LargeMenus/Index';
import SmallMenus from './SmallMenus/Index';
import Tabs from './Tabs/Index';
import AlertOfApps from './AlertOfApps/Index';

import Contexts from '@/Contexts';
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

  let [oState, cSetState] = React.useState<any>({
    open: true,
    value: 0, // 当下被 Selected 的 Tab
    tabs: [], // Tab 列表
    index: -1, // 选中的
    onConfirm: () => void 0,
    link: null,
    menu: null
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
      let oApp = CONFIGS.APPS[oState.index];

      Helpers.Tab.setOnesByAppId(aTabs, oApp.id);

      cSetState({ ...oState, value: iValue, tabs: aTabs, alert: false });
    };

    let oEventEmitter: any = events.admin.addListener('Navigation-onClickLink', cClickLink);
    // 组件销毁前移除事件监听
    return () => {
      events.admin.removeListener('Navigation-onClickLink', cClickLink);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert]);

  useEffect(() => {
    let cRemoveTab = (iIndex: number) => {
      let aTabs = [...oState.tabs];

      let aTabsRows1 = aTabs.slice(0, iIndex);
      let aTabsRows2 = aTabs.slice(iIndex + 1, oState.tabs.length);
      aTabs = aTabsRows1.concat(aTabsRows2);
      // 如果当下关闭的 tab 大于 当下启用的 tab => 当下启用的 tab 不变
      // 如果当下关闭的 tab 小于等于 当下启用的 tab => 当下启用的 tab 往前移动一个
      let iValue = 0;
      iValue = iIndex > oState.value ? oState.value : oState.value - 1;
      iValue = iValue < 0 ? 0 : iValue;
      let oApp = CONFIGS.APPS[oState.index];

      Helpers.Tab.setOnesByAppId(aTabs, oApp.id);

      cSetState({ ...oState, value: iValue, tabs: aTabs });
    };
    let oEventEmitter: any = events.admin.addListener('Navigation-onRemoveTab', cRemoveTab);
    return () => {
      events.admin.removeListener('Navigation-onRemoveTab', cRemoveTab);
    };
  }, [oState.tabs, oState.open, oState.index]);

  useEffect(() => {
    let cClickTab = (iValue: number) => {
      cSetState({ ...oState, value: iValue });
    };
    let oEventEmitter: any = events.admin.addListener('Navigation-onClickTab', cClickTab);
    return () => {
      events.admin.removeListener('Navigation-onClickTab', cClickTab);
    };
  }, [oState.value, oState.open, oState.index]);

  useEffect(() => {
    let cPreClickLink = (oLink: any) => {
      cSetState({ ...oState, alert: true, link: oLink, menu: null });
    };
    let oEventEmitter: any = events.admin.addListener('Navigation-onPreClickLink', cPreClickLink);
    return () => {
      events.admin.removeListener('Navigation-onPreClickLink', cPreClickLink);
    };
  }, [oState.tabs, oState.open, oState.index]);

  useEffect(() => {
    let cPreClicMenu = (oMenu: any) => {
      cSetState({ ...oState, alert: true, link: null, menu: oMenu });
    };
    let oEventEmitter: any = events.admin.addListener('Navigation-onPreClickMenu', cPreClicMenu);
    return () => {
      events.admin.removeListener('Navigation-onPreClickMenu', cPreClicMenu);
    };
  }, [oState.tabs, oState.open, oState.index]);

  useEffect(() => {
    let cClickMenu = (oMenu) => {
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
      let oApp = CONFIGS.APPS[oState.index];

      Helpers.Tab.setOnesByAppId(aTabs, oApp.id);
      cSetState({ ...oState, value: iValue, tabs: aTabs, alert: false });
    };
    let oEventEmitter: any = events.admin.addListener('Navigation-onClickMenu', cClickMenu);
    // 组件销毁前移除事件监听
    return () => {
      events.admin.removeListener('Navigation-onClickMenu', cClickMenu);
    };
  }, [oState.tabs, oState.open, oState.index]);

  useEffect(() => {
    let cClickApp = (iIndex) => {
      let oApp = CONFIGS.APPS[iIndex] ?? null;
      let aTabs = Helpers.Tab.getOnesByAppId(oApp?.id ?? -1) ?? [];
      cSetState({ ...oState, index: iIndex, tabs: aTabs, value: -1 });
    };
    let oEventEmitter: any = events.admin.addListener('Navigation-onClickApp', cClickApp);
    // 组件销毁前移除事件监听
    return () => {
      events.admin.removeListener('Navigation-onClickApp', cClickApp);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert]);

  let cHandleDrawerOpen = () => {
    cSetState({ ...oState, open: true });
  };

  let cHandleDrawerClose = () => {
    cSetState({ ...oState, open: false });
  };

  let cHandleClose = () => {
    cSetState({ ...oState, alert: false });
  };
  return (
    <Contexts.Admin.AppsIndex.Provider value={oState.index}>
      <Contexts.Admin.TabsValue.Provider value={oState.value}>
        <Contexts.Admin.Tabs.Provider value={oState.tabs}>
          <div className={oClasses.root}>
            <Bar handleDrawerOpen={cHandleDrawerOpen} open={oState.open} apps={CONFIGS.APPS}></Bar>
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
                  <DoubleArrowIcon className={oClasses.icon}></DoubleArrowIcon>
                  {/* 点击右边的 App-Icon */}
                </IconButton>
              </div>
              <Divider className={oClasses.divider} />
              <SmallApps status={!oState.open} apps={CONFIGS.APPS}></SmallApps>
              <LargeApps status={oState.open} apps={CONFIGS.APPS} index={oState.index}></LargeApps>
              <Divider className={oClasses.divider} />
              <LargeMenus status={oState.open} menus={CONFIGS.MENUS} apps={CONFIGS.APPS} />
              <SmallMenus status={!oState.open} menus={CONFIGS.MENUS} apps={CONFIGS.APPS} />
              <Divider className={oClasses.divider} />
              <List></List>
            </Drawer>
            <main className={oClasses.content}>
              <div className={oClasses.toolbar}></div>
              <Tabs></Tabs>
            </main>
            <AlertOfApps
              apps={CONFIGS.APPS}
              link={oState.link}
              menu={oState.menu}
              open={oState.alert}
              onClose={cHandleClose}
              onConfirm={oState.onConfirm}></AlertOfApps>
          </div>
        </Contexts.Admin.Tabs.Provider>
      </Contexts.Admin.TabsValue.Provider>
    </Contexts.Admin.AppsIndex.Provider>
  );
}

export default withRouter(Navigation);
