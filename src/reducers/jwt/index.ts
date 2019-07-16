const oJwt = (sJwt: string = '', oAction: any) => {
  sJwt = oAction.payload ? oAction.payload: sJwt;
  switch (oAction.type) {
    case 'JWT_LOGIN':
      return sJwt;
    case 'JWT_REFRESH':
      return sJwt;
    default:
      return sJwt;
  }
};

export default oJwt;