class TabHelper {
  /**
   * getUsrId
   */
  public static getOnesByAdminiUserIdAppId(iAdministratorId = 0, iAppId): any[] {
    let aTabs = [];
    if (iAppId >= 0) {
      let sKey = 'tabs' + '-' + iAdministratorId + '-' + iAppId;

      let sTabs = window.localStorage.getItem(sKey) || JSON.stringify([]);
      aTabs = JSON.parse(sTabs);
    }

    return aTabs;
  }

  public static setOnesByAdminUserIdAppId(aTabs, iAdministratorId = 0, iAppId): boolean {
    if (iAppId >= 0) {
      let sTabs = JSON.stringify(aTabs);
      let sKey = 'tabs' + '-' + iAdministratorId + '-' + iAppId;
      window.localStorage.setItem(sKey, sTabs);
    }

    return true;
  }
}

export default TabHelper;
