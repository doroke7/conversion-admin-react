let cAppIdPageLimit = (sAppId: string = '1', sPage: string = '1', sLimit: string = '10') => {
  let sResult = '/app-id/' + sAppId + '/page/' + sPage + '/limit/' + sLimit;
  return sResult;
};

export default cAppIdPageLimit;
