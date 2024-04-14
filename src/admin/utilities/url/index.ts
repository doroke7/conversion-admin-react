let cUrl = (sRoute: string, oParams: any) => {
  let sResult = sRoute;
  oParams = {
    page: 1,
    limit: 10,
    ...oParams
  };
  let aParams = Object.entries(oParams).map(([sKey, sValue]: [string, string]) => (`${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}`));

  let sParams = aParams.join('&');

  sResult = '?' + sParams;
  return sResult;
};

export default cUrl;
