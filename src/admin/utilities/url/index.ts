let cUrl = (sPrefix: string = '', sPath: string, iAppId: number = 0, iPage: number = 1, iLimit: number = 20, oSearch: any = {}) => {
  let oRegex1: RegExp = /\/app-id\/:[^/]+/g;
  let oRegex2: RegExp = /\/page\/:[^/]+/g;
  let oRegex3: RegExp = /\/limit\/:[^/]+/g;

  sPath = sPath.replace(oRegex1, '/app-id/' + iAppId);
  sPath = sPath.replace(oRegex2, '/page/' + iPage);
  sPath = sPath.replace(oRegex3, '/limit/' + iLimit);

  let aParams = Object.entries(oSearch).map(([sKey, sValue]) => (`${encodeURIComponent(sKey)}=${encodeURIComponent(String(sValue))}`));
  let sParams = aParams.length > 0 ? aParams.join('&') : '';

  let sResult = sPrefix + sPath + (sParams ? '?' + sParams : '');


  return sResult;
};

export default cUrl;
