import jwtDecode from 'jwt-decode';

import Helpers from '@/Helpers/';

let cLogIn: any = (oRaw: any) => {
  return {
    type: 'JWT_LOGIN',
    raw: oRaw
  };
};

let cRefresh: any = (oRaw: any) => {
  return {
    type: 'JWT_REFRESH',
    raw: oRaw
  };
};

let cSignIn: any = (oResponse: any) => {
  return {
    type: 'JWT_SIGNIN',
    response: oResponse
  };
};

let oAuthenticatorAction: any = {
  refresh: (oBody: any, oOption: any) => {
    return async (cDispatch: any) => {
      let fNext = async () => {
        let sJwtOfStorage = Helpers.Authentication.getJwt();

        let oOptions = {
          headers: {
            jwt: sJwtOfStorage
          }
        };
        let oResponse = await Helpers.Axios.post({
          path: '/admin/authentication/authenticator/refresh',
          params: oBody,
          options: oOptions
        });

        let sJwtOfResponse = oResponse.headers?.authorization ?? '';

        if (!sJwtOfResponse) {
          throw new Error('IT_FAILS_TO_REFRESH_JWT');
        }

        cDispatch(cRefresh(sJwtOfResponse));
        Helpers.Authentication.setJwt(sJwtOfResponse);
        let iSecond = 10 * 60;
        setTimeout(async () => {
          await fNext();
        }, iSecond * 1000); // microsecond
      };
      fNext();
    };
  },

  signIn: (oParams: any, oData: any) => {
    return async (cDispatch: any) => {
      let oResponse = await Helpers.Axios.post({
        path: '/Admin/Authentication/Authenticator/signIn',
        params: oParams, // API 中，问号拼接的 参数。 如 ?option={}&query={}
        data: oData // API 中，Body 传参
      });

      if (!oResponse) {
        throw new Error('网络异常');
      }

      if (-1 === oResponse.data.code || 200 != oResponse.status) {
        throw new Error(oResponse.data.message);
      }

      let sJwt = oResponse.headers?.authorization ?? '';
      if (sJwt) {
        Helpers.Authentication.setJwt(sJwt);
      }
      return cDispatch(cSignIn(oResponse));
    };
  }
};

export default oAuthenticatorAction;
