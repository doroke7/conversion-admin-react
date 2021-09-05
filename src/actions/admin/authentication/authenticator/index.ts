import jwtDecode from 'jwt-decode';

import Helpers from '@/Helpers/';

let cLogIn: any = (sJwt: any) => {
  return {
    type: 'JWT_LOGIN',
    payload: sJwt
  };
};

let cRefresh: any = (sJwt: any) => {
  return {
    type: 'JWT_REFRESH',
    payload: sJwt
  };
};

let cSignIn: any = (sJwt: any) => {
  return {
    type: 'JWT_SIGNIN',
    payload: sJwt
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
            // 'access-token': sAccessToken,
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

  signIn(oBody: any) {
    return async (cDispatch: any) => {
      let oResponse = await Helpers.Axios.post({
        path: '/Admin/Authentication/Authenticator/signIn',
        params: oBody
      });

      if (!oResponse) {
        throw new Error('THE_NETWORK_IS_ERROR');
      }

      if (-1 === oResponse.code || 200 != oResponse.status) {
        throw new Error(oResponse.message);
      }

      if (!oResponse.raw || !Object.prototype.hasOwnProperty.call(oResponse.raw, 'jwt') || !oResponse.raw.jwt) {
        throw new Error('接口格式异常');
      }

      let sJwt = oResponse.raw.jwt;
      Helpers.Authentication.setJwt(sJwt);
      cDispatch(cSignIn(sJwt));
    };
  }
};

export default oAuthenticatorAction;
