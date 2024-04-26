class TabHelper {
  /**
   * getUsrId
   */
  public static getOnesByAdminiUserIdAppId(iAdministratorId = 0, iAppId: number): any[] {
    let aTabs = [];

    try {
      if (iAppId >= 0) {
        let sKey = 'tabs' + '-' + iAdministratorId + '-' + iAppId;

        let sTabs = window.localStorage.getItem(sKey) || JSON.stringify([]);
        aTabs = JSON.parse(sTabs);
      }

    } catch (oExeption) {
      // DO NOTHING
    };

    return aTabs;
  }

  public static setOnesByAdminUserIdAppId(aTabs, iAdministratorId = 0, iAppId: number): boolean {
    let sTabs = JSON.stringify([]);


    try {
      if (iAppId >= 0) {
        sTabs = JSON.stringify(aTabs);
        let sKey = 'tabs' + '-' + iAdministratorId + '-' + iAppId;
        window.localStorage.setItem(sKey, sTabs);
      }

    } catch (oExeption) {
      let sKey = 'tabs' + '-' + iAdministratorId + '-' + iAppId;
      window.localStorage.setItem(sKey, sTabs);
    };

    return true;
  }
}

export default TabHelper;
