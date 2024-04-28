
import { useState, useCallback } from 'react';
import Helpers from '@/admin/Helpers/Index';

function useTabs(iAdminUserId: number = 0, iAppId: number = 0) {

  let [aStateTabs, cSetStateTabs] = useState(() => {

    try {
      let aTabs1 = iAppId > 0 ? Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, iAppId) : [];
      let aTabs0 = Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, 0);

      let aTabs = [...aTabs1, ...aTabs0];

      return aTabs;

    } catch (oError) {
      return [];
    };
  });

  let [iStateTabsValue, cSetStateTabsValue] = useState<number>(-1);




  let cGetStateTabs = useCallback(() => {

    if(iAdminUserId > 0){ 
      let aTabs1 = Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, iAppId);
      let aTabs0 = Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, 0);
      let aTabs = [...aTabs1, ...aTabs0];
      let iValue = -1;
      cSetStateTabs(aTabs);
      cSetStateTabsValue(iValue);
    }


  }, [iAdminUserId, iAppId]);

  let cAlterStateTabs = useCallback((aTabs1: any[], aTabs0: any[]) => {
    if(iAdminUserId > 0) {
    
      iAppId > 0 && Helpers.Tab.setOnesByAdminUserIdAppId(aTabs1, iAdminUserId, iAppId);
      Helpers.Tab.setOnesByAdminUserIdAppId(aTabs0, iAdminUserId, 0);
      let aTabs = [...aTabs1, aTabs0];
      cSetStateTabs(aTabs);
    }


  }, [iAdminUserId, iAppId]);


  let cOnTab = useCallback((oRoute: any) => {
    console.log('OnTab 行为发生 oRoute=', oRoute);
    let iAdminUserId = oRoute.adminUserId;
    let iCurrentAppId = iAppId;



    if (iAdminUserId) {


      let aTabs1 = iCurrentAppId > 0 ? Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, iCurrentAppId) : [];
      let aTabs0 = Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, 0);

      let aTabs = [...aTabs1, ...aTabs0] ?? [];

      let oTab = {
        id: oRoute.id,
        path: oRoute.path,
        url: oRoute.url,
        params: oRoute?.params ?? {},
        search: oRoute?.search ?? {},
        text: oRoute?.text || '',
        icon: oRoute.icon ?? ''
      };
      if (oRoute.id == '2-n-0') {
        oTab.text = '未定义';
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
        aTabs1 = iCurrentAppId >= 1 ? [...aTabs1, oTab] : aTabs1;
        aTabs0 = iCurrentAppId <= 0 ? [...aTabs0, oTab] : aTabs0;

        aTabs = [...aTabs1, ...aTabs0];
        iValue = iCurrentAppId >= 1 ? aTabs1.length - 1 : aTabs1.length + aTabs0.length - 1;
      }
      console.log('456 准备写入 Tab 数据，aTabs1=', aTabs1, ', iAdminUserId=', iAdminUserId, ', iCurrentAppId=', iCurrentAppId);
      console.log('457 准备写入 Tab aTabs0=', aTabs0, ', iAdminUserId=', iAdminUserId, ', 0=', 0);

      Helpers.Tab.setOnesByAdminUserIdAppId(aTabs1, iAdminUserId, iCurrentAppId);
      Helpers.Tab.setOnesByAdminUserIdAppId(aTabs0, iAdminUserId, 0);


      cSetStateTabsValue(iValue);
      cSetStateTabs(aTabs);
    };

  }, [iAdminUserId, iAppId]);


  

  let cRemoveStateTab = useCallback((iIndex: number) => {

    if(iAdminUserId > 0){ 

      if (iIndex >= aStateTabs.length) {
        return;

      }

      let aTabs1 = iAppId > 0 ? Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, iAppId) : [];
      let aTabs0 = Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, 0);
  
      if (iIndex < aTabs1.length) {
  
        let aTempLeftTabs1 = aTabs1.slice(0, iIndex);
        let aTempRightTabs1 = aTabs1.slice(iIndex + 1, aTabs1.length);
  
        aTabs1 = [...aTempLeftTabs1, ...aTempRightTabs1];
        Helpers.Tab.setOnesByAdminUserIdAppId(aTabs1, iAdminUserId, iAppId);
  
      };
  
      if (iIndex >= aTabs1.length) {
  
        let aTempLeftTabs0 = aTabs0.slice(0, iIndex - aTabs1.length);
        let aTempRightTabs0 = aTabs0.slice(iIndex - aTabs1.length + 1, aTabs0.length);
  
        aTabs0 = [...aTempLeftTabs0, ...aTempRightTabs0];
        Helpers.Tab.setOnesByAdminUserIdAppId(aTabs0, iAdminUserId, 0);
  
      };
      let aTabs = [...aTabs1, aTabs0];
      cSetStateTabs(aTabs);
  
      iIndex >= 0 ? cSetStateTabsValue(iIndex - 1) : cSetStateTabsValue(-1);
  
    }


  }, [iAdminUserId, iAppId]);


  let cRemoveStateTabs = useCallback(() => {

    if(iAdminUserId > 0){ 
      if (iAppId > 0) {
        Helpers.Tab.setOnesByAdminUserIdAppId([], iAdminUserId, iAppId);
  
      };
  
      Helpers.Tab.setOnesByAdminUserIdAppId([], iAdminUserId, 0);
  
      cSetStateTabs([]);
  
      cSetStateTabsValue(-1);
    }


  }, [iAdminUserId, iAppId]);


  let cRemoveOtherStateTabs = useCallback((iIndex: number) => {

    if(iAdminUserId > 0){ 
      let aTabs1 = iAppId > 0 ? Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, iAppId) : [];
      let aTabs0 = Helpers.Tab.getOnesByAdminiUserIdAppId(iAdminUserId, 0);
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
      Helpers.Tab.setOnesByAdminUserIdAppId(aTabs1, iAdminUserId, iAppId);
      Helpers.Tab.setOnesByAdminUserIdAppId(aTabs0, iAdminUserId, 0);
  
      let aTabs = [...aTabs1, ...aTabs0];
  
      cSetStateTabsValue(0);
      cSetStateTabs(aTabs);
    }


  }, [iAdminUserId, iAppId]);


  let aResults: any[] = [aStateTabs, iStateTabsValue, cOnTab, cGetStateTabs, cAlterStateTabs, cRemoveStateTab, cRemoveStateTabs, cRemoveOtherStateTabs];


  return aResults;
};

export default useTabs;

