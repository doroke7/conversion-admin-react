import Helpers from '@/admin/Helpers/Index';

class Authenticator {
  public static async postSignIn(sname: string, sPassword: string) {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Authentication/Authenticator/signIn',

      params: {
        option: {},
        search: {}
      },

      data: {
        param: {
          name: sname,
          password: sPassword
        }
      }
    });

    return oResponse;
  }

  public static async postRefresh() {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Authentication/Authenticator/refresh',

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

  public static async postSignOut() {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Authentication/Authenticator/signOut',

      params: {
        option: {},
        query: {}
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
