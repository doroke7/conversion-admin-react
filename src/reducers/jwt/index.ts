const oJwt = (sJwt: string = '', oAction: any) => {
  sJwt = oAction.payload ? oAction.payload: sJwt;
  switch (oAction.type) {
    case 'LOGIN_AUTHENTICATION':
      return sJwt;
    default:
      return sJwt;
  }
};

export default oJwt;