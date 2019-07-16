import {
  AxiosHelper
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
      })

      let sJwt = oResponse.jwt;
      cDispatch(cLogin(sJwt));
    }
  }
};

export default oJwt;
