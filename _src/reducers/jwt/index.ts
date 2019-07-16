const oJwt = (aWords: any = [], oAction: any) => {
  let sJWt = oAction.payload;
  switch (oAction.type) {
    case 'LOGIN_AUTHENTICATION':
      return sJWt;
    default:
      return sJWt;
  }
};

export default oJwt;