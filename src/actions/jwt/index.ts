import {
  AxiosHelper,
  AuthenticationHelper,
} from '@/Helpers/';

let cLogin:any = (sJwt: any) => {
  return {
    type: 'LOGIN_AUTHENTICATION',
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
  }
};

export default oJwt;
