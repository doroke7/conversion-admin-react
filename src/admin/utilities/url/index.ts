let cUrl = (sPrefix: string = '', sRoute: string, oParams: any) => {
  let sResult = sRoute;

  let aParams = Object.entries(oParams).map(([sKey, sValue]: [string, string]) => (`${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}`));
  let sParams = aParams.join('&');
  sResult = sPrefix + sRoute + '?' + sParams;

  return sResult;
};

export default cUrl;
