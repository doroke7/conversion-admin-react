import Helpers from '@/Helpers/';
import Exception from '@/Exception/';

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

/**
 * TITLE: 放弃了 action 控制异步 API 请求的做法， 不好用
 * DATE: 2022-0809
 */
let oAuthenticatorAction: any = {
  refresh: (oBody: any, oOption: any, oQuery: any) => {
    return async (cDispatch: any) => {
      let fNext = async () => {
        let sJwtOfStorage = Helpers.Authentication.getJwt();

        let oResponse = await Helpers.Admin.post({
          path: '/Admin/Authentication/Authenticator/refresh',
          params: {
            option: oOption, // API 中，问号拼接的 参数。 如 ?option={}&query={}
            query: oQuery
          },
          data: oBody // API 中，Body 传参
        });

        let sJwtOfResponse = oResponse?.headers?.authorization ?? '';

        if (!sJwtOfResponse) {
          throw new Error('IT_FAILS_TO_REFRESH_JWT');
        }

        cDispatch(cRefresh(sJwtOfResponse));
        Helpers.Authentication.setJwt(sJwtOfResponse);
      };
      fNext();
    };
  },

  signIn: (oBody: any, oOption: any, oQuery: any) => {
    return async (cDispatch: any) => {
      let oResponse = await Helpers.Admin.post({
        path: '/Admin/Authentication/Authenticator/signIn',
        params: {
          option: oOption, // API 中，问号拼接的 参数。 如 ?option={}&query={}
          query: oQuery
        },
        data: oBody // API 中，Body 传参
      });

      if (!oResponse) {
        throw new Exception('网络异常', -3);
      }

      if (0 <= oResponse?.data?.code) {
        throw new Exception(oResponse?.data?.message, oResponse?.data?.code);
      }

      let sJwt = oResponse?.headers?.authorization ?? '';
      if (sJwt) {
        Helpers.Authentication.setJwt(sJwt);
      }
      return cDispatch(cSignIn(oResponse));
    };
  },
  postSignIn: (oResponse: any) => {
    return {
      type: '/Admin/Authentication/Authenticator/postSignIn',
      administratorId: oResponse.data.administrator_id
    };
  }
};

export default oAuthenticatorAction;
