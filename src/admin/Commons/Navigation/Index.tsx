import React, { useContext, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import Sdks from '@/admin/Sdks/Index';

import style from './style';

let oTheme = createTheme({});

function Navigation(oProps: any) {

  let children = oProps.children ?? <></>;

  let oClasses = style(void 0);
  let oHistory = useHistory();
  let oTextRef = useRef('');
  let oDomRef: any = useRef();

  // WARN, 建议不要将全部的 State 集合在一个地方的 hook 写法， 
  // 如果 直接使用 setState(值) 有数据覆盖的危险， 
  // 如果 间接使用 setState(旧的值 => 新的值) 有性能上的问题

  let [bStateOpen, cSetStateOpen] = useState<any>(true);
  let [bStateAlert, cSetStateAlert] = useState<any>(false);
  let [iStateValue, cSetStateValue] = useState<any>(0);
  let [aStateTabs, cSetStateTabs] = useState<any>([]);
  let [iStateIndex, cSetStateIndex] = useState<any>(-1);
  let [oStateMenu, cSetStateMenu] = useState<any>(null);
  let [oStateLink, cSetStateLink] = useState<any>(null);
  let [sStateText, cSetStateText] = useState<any>('');
  let [aStateApps, cSetStateApps] = useState<any>([]);

  let oParams: any = useParams();

  let sAuhorization = useSelector((oStore: any) => (oStore.auhorization));

  let cAdminSystemAdminMenuShowTree = useCallback(async (iAppId: number) => {
    let oResponse = await Sdks.Admin.System.AdminMenu.getShowTree(iAppId);
    return oResponse;
  }, [iStateIndex, sAuhorization]);

  let cAdminSystemAppShowOnes = useCallback(async () => {
    let oResponse = await Sdks.Admin.System.App.getShowOnes();
    return oResponse;
  }, [iStateIndex, sAuhorization]);

  useEffect(() => {
    // useEffect 不不允许 输入 async 函数， 需要修改成 在里面呼叫一个 async 立即呼叫函数
    (async () => {
      let oAdminMenuResponse = await cAdminSystemAdminMenuShowTree(13);
      let oAppResponse = await cAdminSystemAppShowOnes();

      let aApps = oAppResponse?.data?.raw?.ones ?? [];

      cSetStateApps(aApps);

    })();
  }, [cAdminSystemAdminMenuShowTree, cAdminSystemAppShowOnes]);


  useEffect(() => {
    let cRemoveTab = (iIndex: number) => {
      let aTabs = [...aStateTabs];

      let aTabsRows1 = aTabs.slice(0, iIndex);
      let aTabsRows2 = aTabs.slice(iIndex + 1, aStateTabs.length);
      aTabs = aTabsRows1.concat(aTabsRows2);

      let iValue = 0;
      iValue = iIndex > iStateValue ? iStateValue : iStateValue - 1;
      iValue = iValue < -1 ? -1 : iValue;
      let oApp = aStateApps[iStateIndex];

      Helpers.Tab.setOnesByAdministratorIdAppId(aTabs, 0, oApp.id);

      cSetStateValue(iValue);
      cSetStateTabs(aTabs);

      if (aTabs.length >= 1) {
        let oTab = aTabs[iValue];
        oHistory.push(oTab.url);
      };
      if (aTabs.length == 0) {
        oHistory.push('/admin/resource');
      };
    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveTab', cRemoveTab);
    return () => {
      events.removeListener('Navigation-onRemoveTab', cRemoveTab);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, bStateAlert, iStateValue]);

  useEffect(() => {
    let cRemoveOtherTabs = (iIndex: number) => {
      let aTabs = [...aStateTabs];

      let oTabRow = aTabs[iIndex] ?? null;
      aTabs = oTabRow ? [oTabRow] : [];
      let iValue = 0;
      let oApp = aStateApps[iStateIndex];

      Helpers.Tab.setOnesByAdministratorIdAppId(aTabs, 0, oApp.id);

      cSetStateValue(iValue);
      cSetStateTabs(aTabs);

      if (oTabRow) {
        oHistory.push(oTabRow.url);
      };
    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveOtherTabs', cRemoveOtherTabs);
    return () => {
      events.removeListener('Navigation-onRemoveOtherTabs', cRemoveOtherTabs);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, bStateAlert, iStateValue]);

  useEffect(() => {
    let cRemoveAllTabs = (iIndex: number) => {
      let aTabs = [];
      let iValue = -1;
      let oApp = aStateApps[iStateIndex];

      Helpers.Tab.setOnesByAdministratorIdAppId(aTabs, 0, oApp.id);

      cSetStateValue(iValue);
      cSetStateTabs(aTabs);
      oHistory.push('/admin/resource');
    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveAllTabs', cRemoveAllTabs);
    return () => {
      events.removeListener('Navigation-onRemoveAllTabs', cRemoveAllTabs);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, bStateAlert, iStateValue]);

  useEffect(() => {
    let cClickTab = (iValue: number) => {
      cSetStateValue(iValue);

      let oTab = aStateTabs[iValue] ?? null;
      if (oTab) {
        oHistory.push(oTab.url);
      };
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickTab', cClickTab);
    return () => {
      events.removeListener('Navigation-onClickTab', cClickTab);
    };
  }, [iStateValue, bStateOpen, iStateIndex, bStateAlert, aStateTabs]);

  useEffect(() => {
    let cPreClickLink = (oLink: any) => {
      cSetStateAlert(true);
      cSetStateLink(oLink);
      cSetStateMenu(null);

    };
    let oEventEmitter: any = events.addListener('Navigation-onPreClickLink', cPreClickLink);
    return () => {
      events.removeListener('Navigation-onPreClickLink', cPreClickLink);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, bStateAlert]);

  useEffect(() => {
    let cPreClicMenu = (oMenu: any) => {
      cSetStateAlert(true);
      cSetStateLink(null);
      cSetStateMenu(oMenu);
    };
    let oEventEmitter: any = events.addListener('Navigation-onPreClickMenu', cPreClicMenu);
    return () => {
      events.removeListener('Navigation-onPreClickMenu', cPreClicMenu);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, bStateAlert]);

  useEffect(() => {
    let cClickLink = (oLink: any) => {
      let oParams = {
        appId: aStateApps[iStateIndex].id ?? '',
        page: 1,
        size: 10
      };
      oTextRef.current = oLink.text ?? '';
      let sUrl = utilities.url(oLink.path, oParams);
      oHistory.push(sUrl);
    };

    let oEventEmitter: any = events.addListener('Navigation-onClickLink', cClickLink);
    return () => {
      events.removeListener('Navigation-onClickLink', cClickLink);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, bStateAlert]);

  useEffect(() => {
    let cClickMenu = (oMenu: any) => {
      // 如果 Menu 旗下还有子 menu 就不做事
      if (oMenu?.menus && Array.isArray(oMenu?.menus) && oMenu.menus.length >= 1) {
        return;
      };

      let oParams = {
        appId: aStateApps[iStateIndex].id ?? '',
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
      oTextRef.current = oMenu.text ?? '';

      if (oTabOfMenu) {
        oTextRef.current = oMenu.text ?? '';

        cSetStateText(oMenu.text);
        let sUrl = utilities.url(oTabOfMenu.path, oParams);

        oHistory.push(sUrl);
      };
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickMenu', cClickMenu);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onClickMenu', cClickMenu);
    };
  }, [aStateTabs, bStateOpen, iStateIndex]);

  useLayoutEffect(() => {
    let cClickApp = (iIndex: any) => {
      let iResultIndex = iIndex;
      let iAppId = aStateApps[iIndex].id;

      if (iResultIndex != iStateIndex) {
        let aTabs = Helpers.Tab.getOnesByAdministratorIdAppId(0, iAppId ?? -1) ?? [];
        cSetStateIndex(iResultIndex);
        cSetStateTabs(aTabs);
        cSetStateValue(-1);
        if (iStateIndex >= 0) {
          oHistory.push('/admin/resource');
        }
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickApp', cClickApp);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onClickApp', cClickApp);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, bStateAlert]);

  useLayoutEffect(() => {
    let cOnTab = (oRoute: any) => {
      let aTabs =
        oRoute?.params?.appId >= 0 && iStateIndex == -1
          ? Helpers.Tab.getOnesByAdministratorIdAppId(0, oRoute?.params?.appId ?? -1)
          : [...aStateTabs];
      let iIndex = 0;
      let iResultIndex = -1;
      for (iIndex = 0; iIndex < aStateApps.length; iIndex++) {
        if (aStateApps[iIndex].id == oRoute?.params?.appId) {
          iResultIndex = iIndex;
          break;
        };
      };

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
        text: (oRoute.text ?? oTextRef.current) || oTextRef.current,
        icon: oRoute.icon ?? ''
      };
      if (oRoute.id == '2-none-2' || oRoute.id == '2-none-1') {
        oTab.text = oTextRef.current || '未定义';
      };
      let iValue = iStateValue;
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
          };
        };
      };

      if (bExist) {
        // DO NOTHING
      };
      if (!bExist) {
        aTabs = [...aTabs, oTab];
        iValue = aTabs.length - 1;
      };
      let oApp = aStateApps[iStateIndex];

      Helpers.Tab.setOnesByAdministratorIdAppId(aTabs, 0, oRoute?.params?.appId);

      cSetStateValue(iValue);
      cSetStateTabs(aTabs);
      cSetStateAlert(false);
      cSetStateIndex(iResultIndex);

    };

    let oEventEmitter: any = events.addListener('Navigation-onTab', cOnTab);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onTab', cOnTab);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, bStateAlert]);

  useEffect(() => {
    let cResize = (oEvent: any) => {
      let iWidth = oEvent.target.innerWidth;
      if (bStateOpen && iWidth <= oTheme.breakpoints.values['sm']) {
        cSetStateOpen(false);
      };
    };
    window.addEventListener('resize', cResize);

    return () => {
      /**
       * resize 事件只有在 window 拥有，故我们不能使用 react 的 SyntheticEvent
       */
      window.removeEventListener('resize', cResize);
    };
  }, [bStateOpen]);

  useEffect(() => {

  }, []);

  let cHandleLoad = (oEvent) => {
    let iWidth = oDomRef.current.offsetWidth;
    if (iWidth <= oTheme.breakpoints.values['sm']) {
      cSetStateOpen(false);
    };
  };

  let cHandleDrawerOpen = () => {
    cSetStateOpen(true);

  };

  let cHandleDrawerClose = () => {
    cSetStateOpen(false);

  };

  let cHandleClose = () => {
    cSetStateOpen(false);

  };
  return (
    <Contexts.AppsIndex.Provider value={iStateIndex}>
      <Contexts.TabsValue.Provider value={iStateValue}>
        <Contexts.Tabs.Provider value={aStateTabs}>
          <div className={oClasses.root} onLoad={cHandleLoad} ref={oDomRef}>
            <Bar handleDrawerOpen={cHandleDrawerOpen} open={bStateOpen} apps={aStateApps}></Bar>
            <Drawer
              variant="permanent"
              className={clsx(oClasses.drawer, {
                [oClasses.drawerOpen]: bStateOpen,
                [oClasses.drawerClose]: !bStateOpen
              })}
              classes={{
                paper: clsx(oClasses.drawerPaper, {
                  [oClasses.drawerOpen]: bStateOpen,
                  [oClasses.drawerClose]: !bStateOpen
                })
              }}
              open={bStateOpen}>
              <div className={clsx(oClasses.toolbar, {
                [oClasses.toolbarOpen]: bStateOpen,
                [oClasses.toolbarClose]: !bStateOpen
              })}>
                <span className={oClasses.appName}>{CONFIGS.ADMIN.NAME}</span>
                <IconButton className={oClasses.iconButton} onClick={cHandleDrawerClose}>
                  <DoubleArrowIcon className={oClasses.icon}></DoubleArrowIcon>
                </IconButton>
              </div>
              <Divider className={oClasses.firstDivider} />
              <SmallApps status={!bStateOpen} apps={aStateApps}></SmallApps>
              <LargeApps status={bStateOpen} apps={aStateApps} index={iStateIndex}></LargeApps>
              <Divider className={oClasses.secondDivider} />
              <LargeMenus status={bStateOpen} menus={CONFIGS.MENUS} apps={aStateApps} />
              <SmallMenus status={!bStateOpen} menus={CONFIGS.MENUS} apps={aStateApps} />
              <Divider className={oClasses.thirdDivider} />
              <List></List>
            </Drawer>
            <main className={oClasses.content}>
              <div className={oClasses.toolbar}></div>
              <Tabs>{children}</Tabs>
            </main>
            <AlertOfApps
              apps={aStateApps}
              link={oStateLink}
              menu={oStateMenu}
              open={bStateAlert}
              onClose={cHandleClose}></AlertOfApps>
          </div>
        </Contexts.Tabs.Provider>
      </Contexts.TabsValue.Provider>
    </Contexts.AppsIndex.Provider>
  );
}

export default Navigation;
