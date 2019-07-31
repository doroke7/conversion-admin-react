
import {
  AxiosHelper,
  AuthenticationHelper,
} from '@/Helpers/';

let cShow: any = (oUser: any, oResponse: any) => {
  return {
    type: 'SHOW_USER',
    payload: oUser,
    response: oResponse
  };
};

let oUserAction: any = {

  show: (sUserId: any) => {
    return async (cDispatch: any) => {
      let sJwt = AuthenticationHelper.getJwt();

      let oBody = {
        user_id: sUserId
      };

      let oResponse = await AxiosHelper.get({
        path: '/service/resource/user/show/' + sUserId,
        params: oBody,
        headers: {
          'jwt': sJwt,  // 一定要 引号
        }
      });

      if (-1 === oResponse.result) {
        throw new Error('IT_FAILS_TO_LOGIN');
      }

      cDispatch(cShow(sJwt, oResponse));
    }
  },

  showViaMessage: (aMessages: any) => {
    return {
      type: 'SHOW_USER_VIA_MESSAGE',
      payload: aMessages
    };
  }
};

export default oUserAction;
