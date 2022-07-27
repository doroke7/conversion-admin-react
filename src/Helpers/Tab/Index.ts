class TabHelper {
  /**
   * getUsrId
   */
  public static getOnesByAppId(iAppId): any[] {
    let aTabs = [];
    if (iAppId >= 0) {
      let sKey = 'tabs' + '-' + iAppId;

      let sTabs = window.localStorage.getItem(sKey) || JSON.stringify([]);
      aTabs = JSON.parse(sTabs);
    }

    return aTabs;
  }

  public static setOnesByAppId(aTabs, iAppId): boolean {
    if (iAppId >= 0) {
      let sTabs = JSON.stringify(aTabs);
      let sKey = 'tabs' + '-' + iAppId;
      window.localStorage.setItem(sKey, sTabs);
    }

    return true;
  }
}

export default TabHelper;
