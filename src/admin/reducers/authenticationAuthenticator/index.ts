let oAuthenticationAuthenticator = (sJwt: string = '', oAction: any) => {
  let sJwt1 = (oAction?.authorization ?? sJwt) || sJwt;

  switch (oAction.type) {
    case '/Admin/Authentication/Authenticator/postSignIn':
      return sJwt1;
    case 'JWT_REFRESH':
      return sJwt1;
    default:

      return sJwt;
  }
};

export default oAuthenticationAuthenticator;
