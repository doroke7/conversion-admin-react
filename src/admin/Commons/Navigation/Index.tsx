import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { createTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

import Contexts from '@/admin/Contexts/Index';
import events from '@/admin/events/index';
import utilities from '@/admin/utilities/index';
import Helpers from '@/admin/Helpers/Index';
import CONFIGS from '@/CONFIGS/INDEX';

import Bar from './Bar/Index';
import SmallApps from './SmallApps/Index';
import LargeApps from './LargeApps/Index';
import LargeMenus from './LargeMenus/Index';
import SmallMenus from './SmallMenus/Index';
import Tabs from './Tabs/Index';
import AlertOfApps from './AlertOfApps/Index';

import style from './style';

let oMenus = utilities.deTree(CONFIGS.MENUS, 'menus', 'object', 'path');

let oTheme = createTheme({});

function Navigation(oProps: any) {
  let oClasses = style(void 0);
  let children = oProps.children ?? <></>;
  let oHistory = useHistory();
  let oRefOfText = useRef('');
  let oRefOfDom: any = useRef();
  let [oState, cSetState] = React.useState<any>({
    open: true,
    value: 0, // 当下被 Selected 的 Tab 位置
    tabs: [], // Tab 列表
    index: -1, // 选中的 Selectd APP位置
    link: null,
    menu: null
  });

  let oParams: any = useParams();

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
      iValue = iValue < -1 ? -1 : iValue;
      let oApp = CONFIGS.APPS[oState.index];

      Helpers.Tab.setOnesByAdministratorIdAppId(aTabs, 0, oApp.id);

      cSetState({ ...oState, value: iValue, tabs: aTabs });

      if (aTabs.length >= 1) {
        let oTab = aTabs[iValue];
        oHistory.push(oTab.url);
      }
      if (aTabs.length == 0) {
        oHistory.push('/admin/resource');
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveTab', cRemoveTab);
    return () => {
      events.removeListener('Navigation-onRemoveTab', cRemoveTab);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert, oState.value]);

  useEffect(() => {
    let cRemoveOtherTabs = (iIndex: number) => {
      let aTabs = [...oState.tabs];

      let oTabRow = aTabs[iIndex] ?? null;
      aTabs = oTabRow ? [oTabRow] : [];
      let iValue = 0;
      let oApp = CONFIGS.APPS[oState.index];

      Helpers.Tab.setOnesByAdministratorIdAppId(aTabs, 0, oApp.id);

      cSetState({ ...oState, value: iValue, tabs: aTabs });
      if (oTabRow) {
        oHistory.push(oTabRow.url);
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveOtherTabs', cRemoveOtherTabs);
    return () => {
      events.removeListener('Navigation-onRemoveOtherTabs', cRemoveOtherTabs);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert, oState.value]);

  useEffect(() => {
    let cRemoveAllTabs = (iIndex: number) => {
      let aTabs = [];
      let iValue = -1;
      let oApp = CONFIGS.APPS[oState.index];

      Helpers.Tab.setOnesByAdministratorIdAppId(aTabs, 0, oApp.id);

      cSetState({ ...oState, value: iValue, tabs: aTabs });
      oHistory.push('/admin/resource');
    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveAllTabs', cRemoveAllTabs);
    return () => {
      events.removeListener('Navigation-onRemoveAllTabs', cRemoveAllTabs);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert, oState.value]);

  useEffect(() => {
    let cClickTab = (iValue: number) => {
      cSetState({ ...oState, value: iValue });
      let oTab = oState.tabs[iValue] ?? null;
      if (oTab) {
        oHistory.push(oTab.url);
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickTab', cClickTab);
    return () => {
      events.removeListener('Navigation-onClickTab', cClickTab);
    };
  }, [oState.value, oState.open, oState.index, oState.alert, oState.tabs]);

  useEffect(() => {
    let cPreClickLink = (oLink: any) => {
      cSetState({ ...oState, alert: true, link: oLink, menu: null });
    };
    let oEventEmitter: any = events.addListener('Navigation-onPreClickLink', cPreClickLink);
    return () => {
      events.removeListener('Navigation-onPreClickLink', cPreClickLink);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert]);

  useEffect(() => {
    let cPreClicMenu = (oMenu: any) => {
      cSetState({ ...oState, alert: true, link: null, menu: oMenu });
    };
    let oEventEmitter: any = events.addListener('Navigation-onPreClickMenu', cPreClicMenu);
    return () => {
      events.removeListener('Navigation-onPreClickMenu', cPreClicMenu);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert]);

  useEffect(() => {
    let cClickLink = (oLink) => {
      let oParams = {
        appId: CONFIGS.APPS[oState.index].id ?? '',
        page: 1,
        size: 10
      };
      oRefOfText.current = oLink.text ?? '';
      let sUrl = utilities.url(oLink.path, oParams);
      oHistory.push(sUrl);
    };

    let oEventEmitter: any = events.addListener('Navigation-onClickLink', cClickLink);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onClickLink', cClickLink);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert]);

  useEffect(() => {
    let cClickMenu = (oMenu) => {
      // 如果 Menu 旗下还有子 menu 就不做事
      if (oMenu?.menus && Array.isArray(oMenu?.menus) && oMenu.menus.length >= 1) {
        return;
      }

      let oParams = {
        appId: CONFIGS.APPS[oState.index].id ?? '',
        page: 1,
        size: 10
      };
      let oTabOfMenu = {
        id: oMenu.id,
        path: oMenu.path,
        query: '',
        text: oMenu.text,
        icon: oMenu.icon,
        content: oMenu.description
      };
      oRefOfText.current = oMenu.text ?? '';

      if (oTabOfMenu) {
        oRefOfText.current = oMenu.text ?? '';

        cSetState({ ...oState, text: oMenu.text });
        let sUrl = utilities.url(oTabOfMenu.path, oParams);

        oHistory.push(sUrl);
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickMenu', cClickMenu);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onClickMenu', cClickMenu);
    };
  }, [oState.tabs, oState.open, oState.index]);

  useLayoutEffect(() => {
    let cClickApp = (iIndex) => {
      let aApps = CONFIGS.APPS ?? [];
      let iResultIndex = iIndex;
      let iAppId = aApps[iIndex].id;

      if (iResultIndex != oState.index) {
        let aTabs = Helpers.Tab.getOnesByAdministratorIdAppId(0, iAppId ?? -1) ?? [];
        cSetState({ ...oState, index: iResultIndex, tabs: aTabs, value: -1 });
        if (oState.index >= 0) {
          oHistory.push('/admin/resource');
        }
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickApp', cClickApp);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onClickApp', cClickApp);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert]);

  useLayoutEffect(() => {
    let cOnTab = (oRoute: any) => {
      let aTabs =
        oRoute?.params?.appId >= 0 && oState.index == -1
          ? Helpers.Tab.getOnesByAdministratorIdAppId(0, oRoute?.params?.appId ?? -1)
          : [...oState.tabs];
      let aApps = CONFIGS.APPS ?? [];
      let iIndex;
      let iResultIndex = -1;
      for (iIndex = 0; iIndex < aApps.length; iIndex++) {
        if (aApps[iIndex].id == oRoute?.params?.appId) {
          iResultIndex = iIndex;
          break;
        }
      }

      let oParams = {
        appId: oRoute.params.appId ?? '',
        page: 1,
        size: 10
      };
      let oTab = {
        id: oRoute.id,
        path: oRoute.path,
        url: oRoute.url,
        query: '',
        text: (oRoute.text ?? oRefOfText.current) || oRefOfText.current,
        icon: oRoute.icon ?? ''
      };
      if (oRoute.id == '2-none-2' || oRoute.id == '2-none-1') {
        oTab.text = oRefOfText.current || '未定义';
      }
      let iValue = oState.value;
      let bExist = false;
      if (aTabs.length >= 1) {
        for (let iIndexOfTabs = 0; iIndexOfTabs < aTabs.length; iIndexOfTabs++) {
          if (aTabs[iIndexOfTabs]['id'] == oTab.id) {
            iValue = iIndexOfTabs;
            // 如果 Tab 中存档的地址 跟路由的地址不同 => 改写 tab 内的文字
            if (aTabs[iIndexOfTabs]['url'] != oTab.url || aTabs[iIndexOfTabs]['text'] == '未定义') {
              aTabs[iIndexOfTabs]['text'] = oTab.text;
            }
            aTabs[iIndexOfTabs]['icon'] = oTab.icon;
            aTabs[iIndexOfTabs]['url'] = oTab.url;

            bExist = true;
            break;
          }
        }
      }

      if (bExist) {
        // DO NOTHING
      }
      if (!bExist) {
        aTabs = [...aTabs, oTab];
        iValue = aTabs.length - 1;
      }
      let oApp = CONFIGS.APPS[oState.index];

      Helpers.Tab.setOnesByAdministratorIdAppId(aTabs, 0, oRoute?.params?.appId);

      cSetState({ ...oState, value: iValue, tabs: aTabs, alert: false, index: iResultIndex });
    };

    let oEventEmitter: any = events.addListener('Navigation-onTab', cOnTab);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onTab', cOnTab);
    };
  }, [oState.tabs, oState.open, oState.index, oState.alert]);

  useEffect(() => {
    let cResize = (oEvent: any) => {
      let iWidth = oEvent.target.innerWidth;
      if (oState.open && iWidth <= oTheme.breakpoints.values['sm']) {
        cSetState((oOldState) => ({ ...oOldState, open: false }));
      }
    };
    window.addEventListener('resize', cResize);

    return () => {
      /**
       * resize 事件只有在 window 拥有，故我们不能使用 react 的 SyntheticEvent
       */
      window.removeEventListener('resize', cResize);
    };
  }, [oState.open]);

  let cHandleLoad = (oEvent) => {
    let iWidth = oRefOfDom.current.offsetWidth;
    if (iWidth <= oTheme.breakpoints.values['sm']) {
      cSetState((oOldState) => ({ ...oOldState, open: false }));
    }
  };

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
    <Contexts.AppsIndex.Provider value={oState.index}>
      <Contexts.TabsValue.Provider value={oState.value}>
        <Contexts.Tabs.Provider value={oState.tabs}>
          <div className={oClasses.root} onLoad={cHandleLoad} ref={oRefOfDom}>
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
                <span className={oClasses.appName}>{CONFIGS.ADMIN.NAME}</span>
                <IconButton className={oClasses.iconButton} onClick={cHandleDrawerClose}>
                  <DoubleArrowIcon className={oClasses.icon}></DoubleArrowIcon>
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
              <Tabs>{children}</Tabs>
            </main>
            <AlertOfApps
              apps={CONFIGS.APPS}
              link={oState.link}
              menu={oState.menu}
              open={oState.alert}
              onClose={cHandleClose}></AlertOfApps>
          </div>
        </Contexts.Tabs.Provider>
      </Contexts.TabsValue.Provider>
    </Contexts.AppsIndex.Provider>
  );
}

export default Navigation;
