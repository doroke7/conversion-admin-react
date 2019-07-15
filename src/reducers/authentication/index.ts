const oAuthentication = (aWords: any = [], oAction: any) => {
  let _aWords = oAction.payload;
  let __aWords: any = aWords;
  switch (oAction.type) {
    case 'LOGIN_AUTHENTICATION':
      __aWords = [...aWords, ..._aWords];
      return __aWords;
    default:
      return __aWords;
  }
};

export default oAuthentication;