import {
  AxiosHelper,
  AuthenticationHelper,
} from '@/Helpers/';

let cLogin: any = (sJwt: any) => {
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

let oJwt: any = {
  login: (oBody: any) => {
    return async (cDispatch: any) => {

      let oResponse = await AxiosHelper.post({
        path: '/service/authentication/authentication/login',
        params: oBody
      });

      if (-1 === oResponse.result || !oResponse.jwt) {
        throw new Error('IT_FAILS_TO_LOGIN');
      }

      let sJwt = oResponse.jwt;
      AuthenticationHelper.setJwt(sJwt);
      cDispatch(cLogin(sJwt));
    }
  },
  refresh: (oBody: any, oOption: any) => {
    return async (cDispatch: any) => {
      let sJwt = AuthenticationHelper.getJwt();
      let oOptions = {
        headers: {
          'jwt': sJwt  // 一定要 引号
        }
      };

      setInterval(async () => {
        let oResponse = await AxiosHelper.post({
          path: '/service/authentication/authentication/refresh',
          params: oBody,
          options: oOptions
        });
        if (-1 === oResponse.jwt.result || !oResponse.jwt) {
          return;
        }
        sJwt = oResponse.jwt;
        AuthenticationHelper.setJwt(sJwt);
        cDispatch(cRefresh(sJwt));
      }, 10 * 1000); 

    }
  },
  accessTokenToJwt(oBody: any) {
    return async (cDispatch: any) => {
      let sJwt = AuthenticationHelper.getJwt();
      let sAccessToken = AuthenticationHelper.getAccessToken();
      let oOptions = {
        headers: {
          'jwt': sJwt,  // 一定要 引号
          'access-token': sAccessToken
        }
      };

      let oResponse = await AxiosHelper.post({
        path: '/service/authentication/authentication/access-token-to-jwt',
        params: oBody,
        options: oOptions
      });
      if (-1 === oResponse.result || !oResponse.jwt) {
        return;
      }
      sJwt = oResponse.jwt;
      AuthenticationHelper.setJwt(sJwt);
      cDispatch(cRefresh(sJwt));

    }
  }
};

export default oJwt;
