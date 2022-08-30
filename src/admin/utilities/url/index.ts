let cUrl = (sRoute: string, oParams: any) => {
  let sResult = sRoute;
  oParams = {
    appId: 0,
    page: 1,
    limit: 10,
    ...oParams
  };
  for (let sKey in oParams) {
    sResult = sResult.replace(':' + sKey, oParams[sKey]);
  }
  return sResult;
};

export default cUrl;
