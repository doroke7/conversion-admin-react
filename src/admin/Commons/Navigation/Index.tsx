import React, { useContext, useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import clsx from 'clsx';

import { createTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

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
import Backdrop from './Backdrop/Index';
import Tabs from './Tabs/Index';
import Sdks from '@/admin/Sdks/Index';
import hooks from '@/admin/hooks/index';
import actions from '@/admin/actions/';

import style from './style';

let oTheme = createTheme({});

function Navigation(oProps: any) {
  let children = oProps.children ?? <></>;
  let oAuthorizations = oProps.authorizations ?? {};

  let oClasses = style(void 0);
  let oHistory = useHistory();
  let oTextRef = useRef('');
  let oDomRef: any = useRef(null);
  let oRouteMatch = useRouteMatch();
  let oParams: any = useParams();
  let oDispatch = useDispatch();

  let [bStateOpen, cSetStateOpen] = useState<any>(true);
  let [bDialogOpen, cSetDialogOpen] = useState<any>(false);
  let [iStateTabsValue, cSetStateTabsValue] = useState<any>(0);
  let [aStateTabs, cSetStateTabs] = useState<any>([]);
  let [iStateIndex, cSetStateIndex] = useState<any>(-1);
  let [aStateApps, cSetStateApps] = useState<any>([]);
  let [iStateAppId, cSetStateAppId] = useState<any>(0);  // 临时 appId, 用来 路由appId 改变时候驱动改变 iStateIndex

  let [aStateAdminUserLinks, cSetStateAdminUserLinks] = useState<any>([]);
  let [aStateAdminMenus, cSetStateAdminMenus] = useState<any>([]);

  let oMe = useSelector((oStore: any) => (oStore.me));


  let iAppId = useMemo(() => {  // 实际 appId
    let iAppId = aStateApps?.[iStateIndex]?.id ?? 0;
    return iAppId;
  }, [aStateApps, iStateIndex]);


  let cAdminSystemAdminMenuShowTree = useCallback(
    async (iAppId: number) => {
      let oResponse = await Sdks.Admin.System.AdminMenu.getShowTree({ appId: iAppId });
      return oResponse;
    },
    [iAppId, oMe.id]
  );

  let cAdminSystemAppShowOnes = useCallback(async () => {
    let oResponse = await Sdks.Admin.System.App.getShowOnes();
    return oResponse;
  }, [oMe.id]);

  let cComfirmDialog = () => {
    cSetDialogOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (oMe.id) {
        let aResponses = await Promise.all([
          cAdminSystemAppShowOnes(),
          Sdks.Admin.System.AdminUserLink.getShowOnes()
        ]);

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
      }

    })();
  }, [cAdminSystemAppShowOnes, oMe.id]);


  useEffect(() => {
    // useEffect 不不允许 输入 async 函数， 需要修改成 在里面呼叫一个 async 立即呼叫函数
    (async () => {
      let oAdminMenuResponse = await cAdminSystemAdminMenuShowTree(iAppId);

      let aAdminMenus = oAdminMenuResponse?.data?.raw?.tree ?? [];

      cSetStateAdminMenus(aAdminMenus);
    })();
  }, []);


  useEffect(() => {
    let cClickAdminUserLink = (oAdminUserLink: any) => {
      let sUrl = utilities.url('/', oAdminUserLink.url, 0, 0, 0, {});
      oHistory.push(sUrl);
    };

    let oEventEmitter: any = events.addListener('Navigation-onClickAdminUserLink', cClickAdminUserLink);
    return () => {
      events.removeListener('Navigation-onClickAdminUserLink', cClickAdminUserLink);
    };
  }, []);

  useEffect(() => {
    let cClickAdminMenu = (oAdminMenu: any) => {
      // 如果 adminMenu 旗下还有子 adminMenu 就不做事
      if (oAdminMenu?.adminMenus && Array.isArray(oAdminMenu?.adminMenus) && oAdminMenu.adminMenus.length >= 1) {
        return;
      }


      if(oAdminMenu.path.includes('/app-id/:appId')) {
        if(iStateAppId == 0){
          cSetDialogOpen(true);
          return;
        }
      }

      let oThisAdminMenu = {
        id: oAdminMenu.id,
        uri: oAdminMenu.uri,
        path: oAdminMenu.path,
        options: {},
        text: oAdminMenu.text,
        icon: oAdminMenu.icon,
        content: oAdminMenu.description
      };
      oTextRef.current = oAdminMenu.text ?? '';

      if (oThisAdminMenu) {
        oTextRef.current = oAdminMenu.text ?? '';

        let sUrl = utilities.url('/', oThisAdminMenu.path, iStateAppId, 1, 100, {});
        oHistory.push(sUrl);
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickAdminMenu', cClickAdminMenu);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onClickAdminMenu', cClickAdminMenu);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, iStateAppId]);

  useLayoutEffect(() => {
    let cClickApp = (iIndex: any) => {
      if (oMe?.id) {
        let iAppId = aStateApps?.[iIndex]?.id;

        if (iIndex == iStateIndex) {
          // DO NOTHING
          // 点击的 App 跟当前 app 相同
        }

        if (iIndex != iStateIndex) {
          /**
           * NOTE： 切换 APP 时候需要个别把 app 旗下数据归 [] 
           */
          oDispatch(actions.appPipelines.set([]));

          let aTabs1 = Helpers.Tab.getOnesByMeIdAppId(oMe?.id, iAppId);
          let aTabs0 = Helpers.Tab.getOnesByMeIdAppId(oMe?.id, 0);

          let aTabs = [...aTabs1, ...aTabs0];
          let iValue = aTabs.length >= 1 ? 0 : -1;
          cSetStateAppId(iAppId);
          cSetStateIndex(iIndex);
          cSetStateTabs(aTabs);
          cSetStateTabsValue(iValue);

          let sUrl = aTabs.length >= 1 ? aTabs[0]?.url : '/admin/resource';

          if (iIndex >= 0) {
            oHistory.push(sUrl);
          }
        }
      }

    };
    let oEventEmitter: any = events.addListener('Navigation-onClickApp', cClickApp);
    // 组件销毁前移除事件监听
    return () => {
      events.removeListener('Navigation-onClickApp', cClickApp);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, aStateApps, oMe.id]);



  useEffect(() => {
    let cRemoveTab = (iIndex: number) => {
      if (oMe?.id) {
        let oApp = aStateApps[iStateIndex];
        let iAppId = oApp?.id ?? 0;

        let aTabs1 = iAppId > 0 ? Helpers.Tab.getOnesByMeIdAppId(oMe?.id, iAppId) : [];
        let aTabs0 = Helpers.Tab.getOnesByMeIdAppId(oMe?.id, 0);

        let iTabs1Length = aTabs1.length;
        if (iIndex < iTabs1Length) {

          let aTempLeftTabs1 = aTabs1.slice(0, iIndex);
          let aTempRightTabs1 = aTabs1.slice(iIndex + 1, aTabs1.length);

          aTabs1 = [...aTempLeftTabs1, ...aTempRightTabs1];

          console.log('219 准备写入 Tab 数据，aTabs1=', aTabs1, ', oMe?.id=', oMe?.id, ', oApp?.id=', oApp?.id);
          Helpers.Tab.setOnesByMeIdAppId(aTabs1, oMe?.id, oApp?.id);

        };


        if (iIndex >= iTabs1Length) {

          let aTempLeftTabs0 = aTabs0.slice(0, iIndex - aTabs1.length);
          let aTempRightTabs0 = aTabs0.slice(iIndex - aTabs1.length + 1, aTabs0.length);

          aTabs0 = [...aTempLeftTabs0, ...aTempRightTabs0];
          console.log('230 准备写入 Tab aTabs0=', aTabs0, ', oMe?.id=', oMe?.id, ', 0=', 0);
          Helpers.Tab.setOnesByMeIdAppId(aTabs0, oMe?.id, 0);

        };
        let aTabs = [...aTabs1, ...aTabs0];

        let iValue = 0;
        iValue = iIndex > iStateTabsValue ? iStateTabsValue : iStateTabsValue - 1;
        iValue = iValue <= 0 ? 0 : iValue;

        console.log('iValue=', iValue, aTabs1, aTabs0);

        cSetStateTabsValue(iValue);
        cSetStateTabs(aTabs);


        if (aTabs?.length >= 1) {

          let oTab = aTabs[iValue];
          console.log('aTabs=', aTabs);

          console.log('iValue=', iValue);

          console.log('oTab=', oTab);

          oHistory.push(oTab?.url);
        }
        if (aTabs?.length == 0) {
          oHistory.push('/admin/resource');
        }
      }

    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveTab', cRemoveTab);
    return () => {
      events.removeListener('Navigation-onRemoveTab', cRemoveTab);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, iStateTabsValue, oMe.id]);

  useEffect(() => {
    let cRemoveOtherTabs = (iIndex: number) => {
      if (oMe?.id) {
        let oApp = aStateApps[iStateIndex];
        let iAppId = oApp?.id ?? 0;

        let aTabs1 = iAppId > 0 ? Helpers.Tab.getOnesByMeIdAppId(oMe?.id, iAppId) : [];
        let aTabs0 = Helpers.Tab.getOnesByMeIdAppId(oMe?.id, 0);
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

        if (iAppId > 0) {
          console.log('287 准备写入 Tab aTabs1=', aTabs1, ', oMe?.id=', oMe?.id, ', iAppId=', iAppId)
          Helpers.Tab.setOnesByMeIdAppId(aTabs1, oMe?.id, iAppId);
        }

        console.log('291 准备写入 Tab aTabs0=', aTabs0, ', oMe?.id=', oMe?.id, ', 0=', 0);
        Helpers.Tab.setOnesByMeIdAppId(aTabs0, oMe?.id, 0);

        let iValue = 0;

        let aTabs = [...aTabs1, ...aTabs0];

        cSetStateTabsValue(iValue);
        cSetStateTabs(aTabs);

        if (oTab) {
          oHistory.push(oTab.url);
        }
      }

    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveOtherTabs', cRemoveOtherTabs);
    return () => {
      events.removeListener('Navigation-onRemoveOtherTabs', cRemoveOtherTabs);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, iStateTabsValue, oMe.id]);

  useEffect(() => {
    let cRemoveAllTabs = (iIndex: number) => {
      if (oMe?.id) {
        let iValue = -1;
        let oApp = aStateApps[iStateIndex];
        let iAppId = oApp?.id ?? 0;

        if (iAppId > 0) {
          console.log('321 准备写入 Tab []=', [], ', oMe?.id=', oMe?.id, ', iAppId=', iAppId);
          Helpers.Tab.setOnesByMeIdAppId([], oMe?.id, iAppId);
        }
        console.log('325 准备写入 Tab []=', [], ', oMe?.id=', oMe?.id, ', 0=', 0);
        Helpers.Tab.setOnesByMeIdAppId([], oMe?.id, 0);

        cSetStateTabsValue(iValue);
        cSetStateTabs([]);
        oHistory.push('/admin/resource');
      }

    };
    let oEventEmitter: any = events.addListener('Navigation-onRemoveAllTabs', cRemoveAllTabs);
    return () => {
      events.removeListener('Navigation-onRemoveAllTabs', cRemoveAllTabs);
    };
  }, [aStateTabs, bStateOpen, iStateIndex, iStateTabsValue, oMe.id]);

  useEffect(() => {
    let cClickTab = (iValue: number) => {
      cSetStateTabsValue(iValue);

      let oTab = aStateTabs[iValue] ?? null;
      if (oTab) {
        let iAppId = oTab?.params?.appId ?? 0;
        let iPage = oTab?.params?.page ?? 1;
        let iLimit = oTab?.params?.limit ?? 20;
        let oSearch = oTab?.search ?? {};

        let sUrl = utilities.url('', oTab.path, iAppId, iPage, iLimit, oSearch);
        oHistory.push(sUrl);
      }
    };
    let oEventEmitter: any = events.addListener('Navigation-onClickTab', cClickTab);
    return () => {
      events.removeListener('Navigation-onClickTab', cClickTab);
    };
  }, [iStateTabsValue, bStateOpen, iStateIndex, aStateTabs]);

  let cOnTab = useCallback((oRoute: any) => {
    let iAdminUserId = oRoute.adminUserId;
    let iCurrentAppId = 0;
    let iParamsAppId = Number(oRoute?.params?.appId ?? 0);

    if (iAdminUserId) {
      // TODO
      // 如果点击系统菜单，此时已经有选择 app， 需要保留选的app
      let oApp = aStateApps?.[iStateIndex];
      let iAppId = oApp?.id ?? 0;


      iCurrentAppId = iParamsAppId > 0 ? iParamsAppId : iCurrentAppId;
      iCurrentAppId = iParamsAppId <= 0 ? iAppId : iCurrentAppId;

      cSetStateAppId(iCurrentAppId);
    }

    if (iAdminUserId) {


      let aTabs1 = iCurrentAppId > 0 ? Helpers.Tab.getOnesByMeIdAppId(iAdminUserId, iCurrentAppId) : [];
      let aTabs0 = Helpers.Tab.getOnesByMeIdAppId(iAdminUserId, 0);

      let aTabs = [...aTabs1, ...aTabs0];

      let oTab = {
        id: oRoute.id,
        path: oRoute.path,
        url: oRoute.url,
        params: oRoute?.params ?? {},
        search: oRoute?.search ?? {},
        text: oRoute?.text || oTextRef?.current,
        icon: oRoute.icon ?? ''
      };
      if (oRoute.id == '2-n-0') {
        oTab.text = oTextRef.current || '未定义';
      }
      let iValue = iStateTabsValue;
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
            aTabs1[iTabIndex]['path'] = oTab?.path;
            aTabs1[iTabIndex]['icon'] = oTab?.icon;
            aTabs1[iTabIndex]['url'] = oTab?.url;
            aTabs1[iTabIndex]['params'] = oTab?.params;
            aTabs1[iTabIndex]['search'] = oTab?.search;

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
            aTabs0[iTabIndex]['path'] = oTab?.path;
            aTabs0[iTabIndex]['icon'] = oTab?.icon;
            aTabs0[iTabIndex]['url'] = oTab?.url;
            aTabs0[iTabIndex]['params'] = oTab?.params;
            aTabs0[iTabIndex]['search'] = oTab?.search;

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

        aTabs = [...aTabs1, ...aTabs0];
        iValue = iParamsAppId >= 1 ? aTabs1.length - 1 : aTabs1.length + aTabs0.length - 1;
      }
      console.log('456 准备写入 Tab 数据，aTabs1=', aTabs1, ', iAdminUserId=', iAdminUserId, ', iCurrentAppId=', iCurrentAppId);
      console.log('457 准备写入 Tab aTabs0=', aTabs0, ', iAdminUserId=', iAdminUserId, ', 0=', 0);

      Helpers.Tab.setOnesByMeIdAppId(aTabs1, iAdminUserId, iCurrentAppId);
      Helpers.Tab.setOnesByMeIdAppId(aTabs0, iAdminUserId, 0);


      cSetStateTabsValue(iValue);
      cSetStateTabs(aTabs);
    };

  }, [iStateIndex, aStateApps]);


  useEffect(() => {

    if (iStateAppId >= 1 && aStateApps.length > 0) {
      let iIndex = -1;
      for (let iStateAppIndex = 0; iStateAppIndex < aStateApps.length; iStateAppIndex++) {
        let oStateApp = aStateApps[iStateAppIndex];

        if (oStateApp.id == iStateAppId) {
          iIndex = iStateAppIndex;
          break;
        }
      };
      cSetStateIndex(iIndex);

    }



  }, [iStateAppId, aStateApps]);

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

    if (iWidth > 0 && iWidth <= oTheme.breakpoints.values['sm']) {
      cSetStateOpen(false);
    }

    if (iWidth > 0 && iWidth > oTheme.breakpoints.values['sm']) {
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
      <Contexts.TabsValue.Provider value={iStateTabsValue}>
        <Contexts.Tabs.Provider value={aStateTabs}>
          <div
            className={oClasses.root}
            ref={oDomRef}
          >
            <Dialog
              open={bDialogOpen}
              onClose={cComfirmDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                <Typography variant="h6">请先选择 应用(App)</Typography>
                <IconButton aria-label="close" className={oClasses.closeIcon} onClick={cComfirmDialog}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <span>请先选择 应用(App) 再选择此菜单</span>
                  <br></br>
                </DialogContentText>
              </DialogContent>
              <DialogActions className={oClasses.dialogActions}>
                <Button className={oClasses.confirmButton} onClick={cComfirmDialog} color="primary" variant="outlined">
                  确定
                </Button>
              </DialogActions>
            </Dialog>
            <Bar
              handleDrawerOpen={cHandleDrawerOpen}
              open={bStateOpen}
              adminUserLinks={aStateAdminUserLinks}
              authorizations={oAuthorizations}
            >
            </Bar>
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
              <LargeAdminMenus status={bStateOpen} adminMenus={aStateAdminMenus} apps={aStateApps} appId={iStateAppId}/>
              <SmallAdminMenus status={!bStateOpen} adminMenus={aStateAdminMenus} apps={aStateApps} appId={iStateAppId}/>
              <Divider className={oClasses.thirdDivider} />
              <List></List>
            </Drawer>
            <main className={oClasses.content}>
              <div className={oClasses.toolbar}></div>
              <Tabs>
                {children}
              </Tabs>
            </main>
            {/* <Backdrop open={!oMe?.id} error={oMe?.id === null}></Backdrop> */}
          </div>
        </Contexts.Tabs.Provider>
      </Contexts.TabsValue.Provider>
    </Contexts.AppsIndex.Provider>
  );
}

export default Navigation;
