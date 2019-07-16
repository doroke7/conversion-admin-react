const oJwt = (sJwt: string ='', oAction: any) => {
  sJwt = oAction.payload;
  switch (oAction.type) {
    case 'LOGIN_AUTHENTICATION':
      return sJwt;
    default:
      return sJwt;
  }
};

export default oJwt;