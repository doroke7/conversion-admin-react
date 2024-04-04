class historyHepler {
  public static push(oHistory: any, sPath: any, oQuery: any, oOption: any): any {
    let sQuery = JSON.stringify(oQuery || {});
    let sOption = JSON.stringify(oOption || {});
    sQuery = encodeURIComponent(sQuery);
    sOption = encodeURIComponent(sOption);

    sPath = sPath + '?query=' + sQuery + '&option=' + sOption;
    oHistory.push(sPath);

    return oHistory;
  }
}
export default historyHepler;
