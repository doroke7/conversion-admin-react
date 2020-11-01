import jwtDecode from 'jwt-decode';

import { AxiosHelper, AuthenticationHelper } from '@/Helpers/';

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

let oAuthenticationAction: any = {
  refresh: (oBody: any, oOption: any) => {
    return async (cDispatch: any) => {
      let fNext = async () => {
        let sJwt = AuthenticationHelper.getJwt();
        // let sAccessToken = AuthenticationHelper.getAccessToken();

        let oOptions = {
          headers: {
            jwt: sJwt // 一定要 引号
            // 'access-token': sAccessToken,
          }
        };
        let oResponse = await AxiosHelper.post({
          path: '/service/authentication/authentication/refresh',
          params: oBody,
          options: oOptions
        });
        if (-1 === oResponse.jwt.result || !oResponse.jwt) {
          throw new Error('IT_FAILS_TO_REFRESH_JWT');
        }
        sJwt = oResponse.jwt;
        cDispatch(cRefresh(sJwt));
        AuthenticationHelper.setJwt(sJwt);
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
      let oResponse = await AxiosHelper.post({
        path: '/admin/authentication/authentication/sign-in',
        params: oBody
      });

      if (!oResponse) {
        throw new Error('THE_NETWORK_IS_ERROR');
      }

      if (-1 === oResponse.status || !oResponse.jwt) {
        throw new Error(oResponse.key);
      }

      let sJwt = oResponse.jwt;
      AuthenticationHelper.setJwt(sJwt);
      cDispatch(cSignIn(sJwt));
    };
  }
};

export default oAuthenticationAction;
