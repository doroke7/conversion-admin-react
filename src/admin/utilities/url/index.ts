let cUrl = (sRoute: string, oParams: any) => {
  let sResult = sRoute;
  oParams = {
    page: 1,
    limit: 10,
    ...oParams
  };
  for (let sKey in oParams) {
    sResult = sResult.replace(':' + sKey, oParams[sKey]);
  }

  sResult = sResult.replace(/^\/+/, '');

  sResult = '/' + sResult;
  return sResult;
};

export default cUrl;
