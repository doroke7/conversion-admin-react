
import { useState, useCallback } from 'react';
import TabHelper from '@/admin/Helpers/Tab/Index';

function useTabs(iAdminUserId: number = 0, iAppId: number = 0) {

  let [aStateTabs, cSetStateTabs] = useState(() => {

    try {
      let aTabs1 = iAppId > 0 ? TabHelper.getOnesByAdminiUserIdAppId(iAdminUserId, iAppId) : [];
      let aTabs0 = TabHelper.getOnesByAdminiUserIdAppId(iAdminUserId, 0);

      let aTabs = [...aTabs1, aTabs0];

      return aTabs;
    } catch (oError) {
      return [];
    };
  });

  let [iStateTabsValue, cSetStateTabsValue] = useState<number>(-1);

  let cWrapperSetStateTabs = useCallback((aTabs1: any[], aTabs0: any[]) => {
    iAppId > 0 && TabHelper.setOnesByAdminUserIdAppId(aTabs1, iAdminUserId, iAppId);
    TabHelper.setOnesByAdminUserIdAppId(aTabs0, iAdminUserId, 0);
    let aTabs = [...aTabs1, aTabs0];
    cSetStateTabs(aTabs);

  }, [iAdminUserId, iAppId]);

  let cWrapperRemoveStateTab = useCallback((iIndex: number) => {

    if(iAdminUserId > 0){ 

      if (iIndex >= aStateTabs.length) {
        return;

      }

      let aTabs1 = iAppId > 0 ? TabHelper.getOnesByAdminiUserIdAppId(iAdminUserId, iAppId) : [];
      let aTabs0 = TabHelper.getOnesByAdminiUserIdAppId(iAdminUserId, 0);
  
      if (iIndex < aTabs1.length) {
  
        let aTempLeftTabs1 = aTabs1.slice(0, iIndex);
        let aTempRightTabs1 = aTabs1.slice(iIndex + 1, aTabs1.length);
  
        aTabs1 = [...aTempLeftTabs1, ...aTempRightTabs1];
        TabHelper.setOnesByAdminUserIdAppId(aTabs1, iAdminUserId, iAppId);
  
      };
  
      if (iIndex >= aTabs1.length) {
  
        let aTempLeftTabs0 = aTabs0.slice(0, iIndex - aTabs1.length);
        let aTempRightTabs0 = aTabs0.slice(iIndex - aTabs1.length + 1, aTabs0.length);
  
        aTabs0 = [...aTempLeftTabs0, ...aTempRightTabs0];
        TabHelper.setOnesByAdminUserIdAppId(aTabs0, iAdminUserId, 0);
  
      };
      let aTabs = [...aTabs1, aTabs0];
      cSetStateTabs(aTabs);
  
      iIndex >= 0 ? cSetStateTabsValue(iIndex - 1) : cSetStateTabsValue(-1);
  
    }


  }, [iAdminUserId, iAppId]);


  let cWrapperRemoveTabs = useCallback(() => {

    if(iAdminUserId > 0){ 
      if (iAppId > 0) {
        TabHelper.setOnesByAdminUserIdAppId([], iAdminUserId, iAppId);
  
      };
  
      TabHelper.setOnesByAdminUserIdAppId([], iAdminUserId, 0);
  
      cSetStateTabs([]);
  
      cSetStateTabsValue(-1);
    }


  }, [iAdminUserId, iAppId]);


  let cWrapperRemoveOtherTabs = useCallback((iIndex: number) => {

    if(iAdminUserId > 0){ 
      let aTabs1 = iAppId > 0 ? TabHelper.getOnesByAdminiUserIdAppId(iAdminUserId, iAppId) : [];
      let aTabs0 = TabHelper.getOnesByAdminiUserIdAppId(iAdminUserId, 0);
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
      TabHelper.setOnesByAdminUserIdAppId(aTabs1, iAdminUserId, iAppId);
      TabHelper.setOnesByAdminUserIdAppId(aTabs0, iAdminUserId, 0);
  
      let aTabs = [...aTabs1, ...aTabs0];
  
      cSetStateTabsValue(0);
      cSetStateTabs(aTabs);
    }


  }, [iAdminUserId, iAppId]);




  let aResults: any[] = [aStateTabs, iStateTabsValue, cWrapperRemoveStateTab, cWrapperRemoveTabs, cWrapperRemoveOtherTabs];


  return aResults;
};

export default useTabs;

