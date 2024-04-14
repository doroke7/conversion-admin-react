import React, { useContext, useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
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
import LargeAdminMenus from './LargeAdminMenus/Index';
import SmallAdminMenus from './SmallAdminMenus/Index';
import Tabs from './Tabs/Index';
import Sdks from '@/admin/Sdks/Index';

import style from './style';

let oTheme = createTheme({});

function Navigation(oProps: any) {
  let children = oProps.children ?? <></>;

  let oClasses = style(void 0);
  let oHistory = useHistory();
  let oTextRef = useRef('');
  let oDomRef: any = useRef(null);


  // WARN, 建议不要将全部的 State 集合在一个地方的 hook 写法，
  // 如果 直接使用 setState(值) 有数据覆盖的危险，
  // 如果 间接使用 setState(旧的值 => 新的值) 有性能上的问题

  let [bStateOpen, cSetStateOpen] = useState<any>(true);
  let [iStateValue, cSetStateValue] = useState<any>(0);
  let [aStateTabs, cSetStateTabs] = useState<any>([]);
  let [iStateIndex, cSetStateIndex] = useState<any>(-1);
  let [oStateMenu, cSetStateMenu] = useState<any>(null);
  let [oStateLink, cSetStateLink] = useState<any>(null);
  let [sStateText, cSetStateText] = useState<any>('');
  let [aStateApps, cSetStateApps] = useState<any>([]);
  let [aStateAdminUserLinks, cSetStateAdminUserLinks] = useState<any>([]);
  let [aStateAdminMenus, cSetStateAdminMenus] = useState<any>([]);

  let oParams: any = useParams();

  let sAuhorization = useSelector((oStore: any) => oStore.auhorization);

  let iAppId = useMemo(() => {
    let iAppId = aStateApps?.[iStateIndex]?.id ?? 0;
    return iAppId;
  }, [aStateApps, iStateIndex]);

  let cAdminSystemAdminMenuShowTree = useCallback(
    async (iAppId: number) => {
      let oResponse = await Sdks.Admin.System.AdminMenu.getShowTree({ appId: iAppId });
      return oResponse;
    },
    [iAppId, sAuhorization]
  );

  let cAdminSystemAppShowOnes = useCallback(async () => {
    let oResponse = await Sdks.Admin.System.App.getShowOnes();
    return oResponse;
  }, [sAuhorization]);

  useEffect(() => {
    // useEffect 不不允许 输入 async 函数， 需要修改成 在里面呼叫一个 async 立即呼叫函数
    (async () => {
      let aResponses = await Promise.all([cAdminSystemAppShowOnes(), Sdks.Admin.System.AdminUserLink.getShowOnes()]);
      let oAppResponse = aResponses[0];
      let oAdminUserLinkResponse = aResponses[1];

      let aApps = oAppResponse?.data?.raw?.ones ?? [];
      let aAdminUserLinks = oAdminUserLinkResponse?.data?.raw?.ones ?? [];

      if (aApps.length == 0) {
        let oMessage = {
          code: -1,
          message: '您尚未配置管理的應用程序，請聯繫系統管理員',
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      }

      cSetStateApps(aApps);
      cSetStateAdminUserLinks(aAdminUserLinks);
    })();
  }, [cAdminSystemAppShowOnes]);

  useEffect(() => {
    // useEffect 不不允许 输入 async 函数， 需要修改成 在里面呼叫一个 async 立即呼叫函数
    (async () => {
      let oAdminMenuResponse = await cAdminSystemAdminMenuShowTree(iAppId);

      let aAdminMenus = oAdminMenuResponse?.data?.raw?.tree ?? [];
      console.log('API AdminMenu 数据=', oAdminMenuResponse);

      cSetStateAdminMenus(aAdminMenus);
    })();
  }, [iAppId]);

  useEffect(() => {
    let cRemoveTab = (iIndex: number) => {
      let oApp = aStateApps[iStateIndex];
      let iAppId = oApp?.id ?? 0;

      let aTabs1 = iAppId > 0 ? Helpers.Tab.getOnesByAdminiUserIdAppId(0, iAppId) : [];
      let aTabs0 = Helpers.Tab.getOnesByAdminiUserIdAppId(0, 0);

      if (iIndex < aTabs1.length) {

        let aTempLeftTabs1 = aTabs1.slice(0, iIndex);
        let aTempRightTabs1 = aTabs1.slice(iIndex + 1, aTabs1.length);

        aTabs1 = [...aTempLeftTabs1, ...aTempRightTabs1];
        Helpers.Tab.setOnesByAdminUserIdAppId(aTabs1, 0, oApp?.id);

      };

      if (iIndex >= aTabs1.length) {

        let aTempLeftTabs0 = aTabs0.slice(0, iIndex - aTabs1.length);
        let aTempRightTabs0 = aTabs0.slice(iIndex - aTabs1.length + 1, aTabs0.length);

        aTabs0 = [...aTempLeftTabs0, ...aTempRightTabs0];
        Helpers.Tab.setOnesByAdminUserIdAppId(aTabs0, 0, 0);

      };
      let aTabs = [...aTabs1, ...aTabs0];

      let iValue = 0;
      iValue = iIndex > iStateValue ? iStateValue : iStateValue - 1;
      iValue = iValue < -1 ? -1 : iValue;


      cSetStateValue(iValue);
      cSetStateTabs(aTabs);

      if (aTabs?.length >= 1) {
        let oTab = aTabs[iValue];
        oHistory.push(oTab?.url);
      }
      if (aTabs?.length == 0) {
        oHistory.push('/admin/resource');
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveTab', cRemoveTab);
    return () => {
      events.removeListener('Navigation-onRemoveTab', cRemoveTab);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, iStateValue]);

  useEffect(() => {
    let cRemoveOtherTabs = (iIndex: number) => {
      let oApp = aStateApps[iStateIndex];
      let iAppId = oApp?.id ?? 0;

      let aTabs1 = iAppId > 0 ? Helpers.Tab.getOnesByAdminiUserIdAppId(0, iAppId) : [];
      let aTabs0 = Helpers.Tab.getOnesByAdminiUserIdAppId(0, 0);
      let oTab = null;

      if (iIndex < aTabs1.length) {
        oTab = aTabs1[iIndex] ?? null;
        aTabs1 = [oTab];
        aTabs0 = [];
      };

      if (iIndex >= aTabs1.length) {
        oTab = aTabs0[iIndex - aTabs1.length] ?? null;
        aTabs0 = [];
        aTabs0 = [oTab];
      };
      Helpers.Tab.setOnesByAdminUserIdAppId(aTabs1, 0, iAppId);
      Helpers.Tab.setOnesByAdminUserIdAppId(aTabs0, 0, 0);

      let iValue = 0;

      let aTabs = [...aTabs1, ...aTabs0];

      cSetStateValue(iValue);
      cSetStateTabs(aTabs);

      if (oTab) {
        oHistory.push(oTab.url);
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveOtherTabs', cRemoveOtherTabs);
    return () => {
      events.removeListener('Navigation-onRemoveOtherTabs', cRemoveOtherTabs);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, iStateValue]);

  useEffect(() => {
    let cRemoveAllTabs = (iIndex: number) => {
      let iValue = -1;
      let oApp = aStateApps[iStateIndex];
      let iAppId = oApp?.id ?? 0;

      iAppId > 0 && Helpers.Tab.setOnesByAdminUserIdAppId([], 0, iAppId);
      Helpers.Tab.setOnesByAdminUserIdAppId([], 0, 0);

      cSetStateValue(iValue);
      cSetStateTabs([]);
      oHistory.push('/admin/resource');
    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveAllTabs', cRemoveAllTabs);
    return () => {
      events.removeListener('Navigation-onRemoveAllTabs', cRemoveAllTabs);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, iStateValue]);

  useEffect(() => {
    let cClickTab = (iValue: number) => {
      cSetStateValue(iValue);

      let oTab = aStateTabs[iValue] ?? null;
      if (oTab) {
        oHistory.push(oTab.url);
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickTab', cClickTab);
    return () => {
      events.removeListener('Navigation-onClickTab', cClickTab);
    };
  }, [iStateValue, bStateOpen, iStateIndex, aStateTabs]);

  useEffect(() => {
    let cPreClickAdminUserLink = (oLink: any) => {
      cSetStateLink(oLink);
      cSetStateMenu(null);
    };
    let oEventEmitter: any = events.addListener('Navigation-onPreClickAdminUserLink', cPreClickAdminUserLink);
    return () => {
      events.removeListener('Navigation-onPreClickAdminUserLink', cPreClickAdminUserLink);
    };
  }, [aStateTabs, bStateOpen, iStateIndex]);

  useEffect(() => {
    let cClickAdminUserLink = (oAdminUserLink: any) => {
      let oParams = {
        page: 1,
        limit: 10
      };
      let sUrl = utilities.url('', oAdminUserLink.url, oParams);
      oHistory.push(sUrl);
    };

    let oEventEmitter: any = events.addListener('Navigation-onClickAdminUserLink', cClickAdminUserLink);
    return () => {
      events.removeListener('Navigation-onClickAdminUserLink', cClickAdminUserLink);
    };
  }, [aStateTabs, bStateOpen, iStateIndex]);

  useEffect(() => {
    let cClickAdminMenu = (oAdminMenu: any) => {
      // 如果 Menu 旗下还有子 menu 就不做事
      if (oAdminMenu?.adminMenus && Array.isArray(oAdminMenu?.adminMenus) && oAdminMenu.adminMenus.length >= 1) {
        return;
      }

      let oParams = {
        page: 1,
        limit: 10
      };
      let oThisAdminMenu = {
        id: oAdminMenu.id,
        uri: oAdminMenu.uri,
        path: oAdminMenu.path,
        query: '',
        text: oAdminMenu.text,
        icon: oAdminMenu.icon,
        content: oAdminMenu.description
      };
      oTextRef.current = oAdminMenu.text ?? '';

      if (oThisAdminMenu) {
        oTextRef.current = oAdminMenu.text ?? '';

        cSetStateText(oAdminMenu.text);
        let sUrl = utilities.url('/', oThisAdminMenu.uri, oParams);

        console.log('oAdminMenu=', oAdminMenu);
        console.log('oThisAdminMenu=', oThisAdminMenu);
        console.log('oParams=', oParams);
        console.log('sUrl=', sUrl);

        //
        oHistory.push(sUrl);
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickAdminMenu', cClickAdminMenu);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onClickAdminMenu', cClickAdminMenu);
    };
  }, [aStateTabs, bStateOpen, iStateIndex]);

  useLayoutEffect(() => {
    let cClickApp = (iIndex: any) => {
      let iAppId = aStateApps?.[iIndex]?.id;

      if (iIndex == iStateIndex) {
        // DO NOTHING
        // 点击的 App 跟当前 app 相同
      }

      if (iIndex != iStateIndex) {
        let aTabs1 = Helpers.Tab.getOnesByAdminiUserIdAppId(0, iAppId);
        let aTabs0 = Helpers.Tab.getOnesByAdminiUserIdAppId(0, 0);

        let aTabs = [...aTabs1, ...aTabs0];
        let iValue = -1;
        cSetStateIndex(iIndex);
        cSetStateTabs(aTabs);
        cSetStateValue(iValue);
        if (iIndex >= 0) {
          oHistory.push('/admin/resource');
        }
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickApp', cClickApp);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onClickApp', cClickApp);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, aStateApps]);

  let cOnTab = useCallback((oRoute: any) => {

    console.log('OnTab 行为发生 oRoute=', oRoute);
    // TODO
    // 如果点击系统菜单，此时已经有选择 app， 需要保留选的app

    let oApp = aStateApps?.[iStateIndex];
    let iAppId = oApp?.id ?? 0;

    let iParamsAppId = Number(oRoute?.params?.appId ?? 0);

    let aTabs1 = iAppId > 0 ? Helpers.Tab.getOnesByAdminiUserIdAppId(0, iAppId) : [];
    let aTabs0 = Helpers.Tab.getOnesByAdminiUserIdAppId(0, 0);

    let aTabs = iStateIndex >= 0 ? [...aStateTabs] : [];
    aTabs = iStateIndex == -1 ? [...aTabs0] : aTabs;
    aTabs = iStateIndex == -1 ? [...aTabs1, ...aTabs0] : aTabs;

    let iResultIndex = -1;

    if (iStateIndex >= 0) {
      iResultIndex = iStateIndex;
    }

    if (iStateIndex <= -1) {
      for (let iStateAppIndex = 0; iStateAppIndex < aStateApps.length; iStateAppIndex++) {
        let oStateApp = aStateApps[iStateAppIndex];

        if (oStateApp.id == iParamsAppId) {
          iResultIndex = iStateAppIndex;
          break;
        }
      };

    }

    let sUrl = utilities.url('', oRoute.url, oRoute?.params);

    let oTab = {
      id: oRoute.id,
      path: oRoute.path,
      url: oRoute.url,
      param: oRoute?.params ?? {},
      text: oRoute?.text || oTextRef?.current,
      icon: oRoute.icon ?? ''
    };
    if (oRoute.id == '2-n-0') {
      oTab.text = oTextRef.current || '未定义';
    }
    let iValue = iStateValue;
    let bExist = false;
    let iTabIndex = 0;

    if (aTabs1.length >= 1) {
      for (iTabIndex = 0; iTabIndex < aTabs1.length; iTabIndex++) {
        if (aTabs1[iTabIndex]['id'] == oTab.id) {
          iValue = iTabIndex;
          // 如果 Tab 中存档的地址 跟路由的地址不同 => 改写 tab 内的文字
          if (aTabs1[iTabIndex]['url'] != oTab?.url || aTabs1[iTabIndex]['text'] == '未定义') {
            aTabs1[iTabIndex]['text'] = oTab?.text;
          }
          aTabs1[iTabIndex]['icon'] = oTab?.icon;
          aTabs1[iTabIndex]['url'] = oTab?.url;

          bExist = true;
          break;
        }
      }
    }

    if (aTabs0.length >= 1 && !bExist) {
      for (iTabIndex = 0; iTabIndex < aTabs0.length; iTabIndex++) {
        if (aTabs0[iTabIndex]['id'] == oTab.id) {
          iValue = iTabIndex + aTabs1.length;
          // 如果 Tab 中存档的地址 跟路由的地址不同 => 改写 tab 内的文字
          if (aTabs0[iTabIndex]['url'] != oTab?.url || aTabs0[iTabIndex]['text'] == '未定义') {
            aTabs0[iTabIndex]['text'] = oTab?.text;
          }
          aTabs0[iTabIndex]['icon'] = oTab?.icon;
          aTabs0[iTabIndex]['url'] = oTab?.url;

          bExist = true;
          break;
        }
      }
    }
    if (bExist) {
      // DO NOTHING
    }
    if (!bExist) {
      aTabs1 = iParamsAppId >= 1 ? [...aTabs1, oTab] : aTabs1;
      aTabs0 = iParamsAppId <= 0 ? [...aTabs0, oTab] : aTabs0;

      Helpers.Tab.setOnesByAdminUserIdAppId(aTabs1, 0, iParamsAppId);
      Helpers.Tab.setOnesByAdminUserIdAppId(aTabs0, 0, 0);
      aTabs = [...aTabs1, ...aTabs0];
      iValue = iParamsAppId >= 1 ? aTabs1.length - 1 : aTabs1.length + aTabs0.length - 1;

    }

    cSetStateValue(iValue);
    cSetStateTabs(aTabs);
    cSetStateIndex(iResultIndex);

  }, [iStateIndex, aStateApps]);

  useLayoutEffect(() => {


    let oEventEmitter: any = events.addListener('Navigation-onTab', cOnTab);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onTab', cOnTab);
    };
  }, [iStateIndex, aStateApps]);

  useEffect(() => {
    let cResize = (oEvent: any) => {
      let iWidth = oEvent.target.innerWidth;

      if (bStateOpen && iWidth <= oTheme.breakpoints.values['sm']) {
        cSetStateOpen(false);
      }

      if (!bStateOpen && iWidth > oTheme.breakpoints.values['sm']) {
        cSetStateOpen(true);
      }
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
    let iWidth = oDomRef.current.offsetWidth;

    if (iWidth <= oTheme.breakpoints.values['sm']) {
      cSetStateOpen(false);
    }

    if (iWidth > oTheme.breakpoints.values['sm']) {
      cSetStateOpen(true);
    }

  }, [oDomRef?.current?.offsetHeight]);  // 利用 高度改变的瞬间 =》 DOM 已经完成， =》 判断是否要开关 菜单


  let cHandleDrawerOpen = () => {
    cSetStateOpen(true);
  };

  let cHandleDrawerClose = () => {
    cSetStateOpen(false);
  };

  let cHandleClose = () => {
    cSetStateOpen(false);
  };

  let aAppBackgroundClasses = [
    oClasses.backgroundColor01,
    oClasses.backgroundColor02,
    oClasses.backgroundColor03,
    oClasses.backgroundColor04,
    oClasses.backgroundColor05,
    oClasses.backgroundColor06,
    oClasses.backgroundColor07,
    oClasses.backgroundColor08,
    oClasses.backgroundColor09,
    oClasses.backgroundColor10,
    oClasses.backgroundColor11,
    oClasses.backgroundColor12,
    oClasses.backgroundColor13,
    oClasses.backgroundColor14,
    oClasses.backgroundColor15
  ];

  let aMemoAppBackgroundClasses = useMemo(() => {
    let aResults: any[] = [];

    if (aAppBackgroundClasses.length >= aStateApps.length) {
      aResults.push(...aAppBackgroundClasses);
      return aResults;
    }

    if (aAppBackgroundClasses.length < aStateApps.length) {
      let iFactor = Math.ceil(aStateApps.length / (aAppBackgroundClasses.length || 1));

      for (let iIndex = 0; iIndex < iFactor; iIndex++) {
        aResults.push(...aAppBackgroundClasses);
      }

      return aResults;
    }

    return aResults;
  }, [aStateApps.length]);

  return (
    <Contexts.AppsIndex.Provider value={iStateIndex}>
      <Contexts.TabsValue.Provider value={iStateValue}>
        <Contexts.Tabs.Provider value={aStateTabs}>
          <div className={oClasses.root} ref={oDomRef}>
            <Bar handleDrawerOpen={cHandleDrawerOpen} open={bStateOpen} adminUserLinks={aStateAdminUserLinks}></Bar>
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
              <div
                className={clsx(oClasses.toolbar, {
                  [oClasses.toolbarOpen]: bStateOpen,
                  [oClasses.toolbarClose]: !bStateOpen
                })}>
                <span className={oClasses.appName}>{CONFIGS.ADMIN.NAME}</span>
                <IconButton className={oClasses.iconButton} onClick={cHandleDrawerClose}>
                  <DoubleArrowIcon className={oClasses.icon}></DoubleArrowIcon>
                </IconButton>
              </div>
              <Divider className={oClasses.firstDivider} />
              <SmallApps
                status={!bStateOpen}
                apps={aStateApps}
                backgroundClasses={aMemoAppBackgroundClasses}></SmallApps>
              <LargeApps
                status={bStateOpen}
                apps={aStateApps}
                index={iStateIndex}
                backgroundClasses={aMemoAppBackgroundClasses}></LargeApps>
              <Divider className={oClasses.secondDivider} />
              <LargeAdminMenus status={bStateOpen} adminMenus={aStateAdminMenus} apps={aStateApps} />
              <SmallAdminMenus status={!bStateOpen} adminMenus={aStateAdminMenus} apps={aStateApps} />
              <Divider className={oClasses.thirdDivider} />
              <List></List>
            </Drawer>
            <main className={oClasses.content}>
              <div className={oClasses.toolbar}></div>
              <Tabs>
                {children}
              </Tabs>
            </main>
          </div>
        </Contexts.Tabs.Provider>
      </Contexts.TabsValue.Provider>
    </Contexts.AppsIndex.Provider>
  );
}

export default Navigation;
