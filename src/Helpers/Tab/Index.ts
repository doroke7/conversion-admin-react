class TabHelper {
  /**
   * getUsrId
   */
  public static get(): [] {
    let sTabs = window.localStorage.getItem('tabs') || JSON.stringify([]);
    let aTabs = JSON.parse(sTabs);
    return aTabs;
  }

  public static set(aTabs): [] {
    let sTabs = JSON.stringify(aTabs);
    window.localStorage.setItem('tabs', sTabs);
    return aTabs;
  }
}

export default TabHelper;
