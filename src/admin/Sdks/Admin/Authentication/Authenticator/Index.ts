import Helpers from '@/admin/Helpers/Index';

class Authenticator {
  public static async postSignIn(oParam: any = {}) {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Authentication/Authenticator/signIn',

      params: {
        option: {},
        search: {}
      },

      data: {
        param: oParam
      }
    });

    return oResponse;
  }

  public static async postRefresh(oParam: any = {}, oSearch: any = {}, option: any = {}) {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Authentication/Authenticator/refresh',

      params: {
        option: option,
        search: oSearch
      },

      data: {
        param: oParam
      },
      options: {}
    });

    return oResponse;
  }

  public static async postSignOut(oParam: any = {}) {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Authentication/Authenticator/signOut',

      params: {
        option: {},
        search: {}
      },

      data: {
        param: {}
      },
      options: {}
    });

    return oResponse;
  }
}

export default Authenticator;
