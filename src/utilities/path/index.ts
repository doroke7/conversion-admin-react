let cPath = (sRoute: string, oParams: any) => {
  let sResult = sRoute;
  for (let sKey in oParams) {
    sResult = sResult.replace(':' + sKey, oParams[sKey]);
  }
  return sResult;
};

export default cPath;
