import AuthenticationHelper from '@/admin/Helpers/Authentication/Index';

let oAuthorization = (sAuhorization: string = '', oAction: any) => {
  let sAuhorization0 = AuthenticationHelper.authorization();

  let sAuhorization1 = (oAction?.authorization ?? sAuhorization) || sAuhorization || sAuhorization0;

  switch (oAction.type) {
    case '/Admin/Authentication/Authenticator/postSignIn':
      return sAuhorization1;
    case 'JWT_REFRESH':
      return sAuhorization1;
    default:
      return sAuhorization1;
  }
};

export default oAuthorization;
