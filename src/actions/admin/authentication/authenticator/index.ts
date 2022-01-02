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

let cSignIn: any = (oRaw: any) => {
  return {
    type: 'JWT_SIGNIN',
    raw: oRaw
  };
};

let oAuthenticatorAction: any = {
  refresh: (oBody: any, oOption: any) => {
    return async (cDispatch: any) => {
      let fNext = async () => {
        let sJwt = Helpers.Authentication.getJwt();
        // let sAccessToken = AuthenticationHelper.getAccessToken();

        let oOptions = {
          headers: {
            jwt: sJwt // 一定要 引号
          }
        };
        let oResponse = await Helpers.Axios.post({
          path: '/admin/authentication/authenticator/refresh',
          params: oBody,
          options: oOptions
        });
        if (-1 === oResponse.jwt.result || !oResponse.jwt) {
          throw new Error('IT_FAILS_TO_REFRESH_JWT');
        }
        sJwt = oResponse.jwt;
        cDispatch(cRefresh(sJwt));
        Helpers.Authentication.setJwt(sJwt);
        let oPayLoad: any = jwtDecode(sJwt);
        let iExp = oPayLoad.exp; // second
        let iNow = new Date().getTime() / 1000; // second
        let iSecond = iExp - iNow - 10 * 60 <= 0 ? 0 : iExp - iNow - 10 * 60;
        setTimeout(async () => {
          await fNext();
        }, iSecond * 1000); // microsecond
      };
      fNext();
    };
  },

  signIn(oParams: any, oData: any) {
    return async (cDispatch: any) => {
      let oResponse = await Helpers.Axios.post({
        path: '/Admin/Authentication/Authenticator/signIn',
        params: oParams,
        data: oData
      });

      if (!oResponse) {
        throw new Error('网络异常');
      }

      if (-1 === oResponse.data.code || 200 != oResponse.status) {
        throw new Error(oResponse.data.message);
      }

      let sJwt = oResponse.headers['authorization'];
      Helpers.Authentication.setJwt(sJwt);
      return cDispatch(cSignIn(oResponse.data.raw));
    };
  }
};

export default oAuthenticatorAction;
