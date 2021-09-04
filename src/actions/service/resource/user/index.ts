import Helpers from '@/Helpers/';

let cShow: any = (aUsers: any, oResponse: any) => {
  return {
    type: '__SHOW_USER',
    payload: aUsers,
    response: oResponse
  };
};

let oUserAction: any = {
  show: (aUsers: any) => {
    return {
      type: 'SHOW_USER',
      payload: aUsers
    };
  },

  __show: (sUserId: any) => {
    return async (cDispatch: any) => {
      let sJwt = Helpers.Authentication.getJwt();

      let oBody = {
        user_id: sUserId
      };

      let oResponse = await Helpers.Axios.get({
        path: '/service/resource/user/show/' + sUserId,
        params: oBody,
        headers: {
          jwt: sJwt // 一定要 引号
        }
      });

      if (-1 === oResponse.result && (!oResponse.data || !oResponse.data.users)) {
        throw new Error('IT_FAILS_TO_SHOW_USER');
      }

      let aUsers = oResponse.data.users;

      cDispatch(cShow(aUsers, oResponse));
    };
  },

  showViaMessage: (aMessages: any) => {
    return {
      type: 'SHOW_USER_VIA_MESSAGE',
      payload: aMessages
    };
  },

  edit: (aUsers: any) => {
    return {
      type: 'EDIT_USER',
      payload: aUsers
    };
  }
};

export default oUserAction;
