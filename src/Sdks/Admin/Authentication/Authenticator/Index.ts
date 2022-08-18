import Helpers from '@/Helpers/Index';

class Authenticator {
  public static async postSignIn(sUsername, sPassword) {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Authentication/Authenticator/signIn',
      // API 中，问号拼接的 参数。 如 ?option={}&query={}
      params: {
        option: {},
        query: {}
      },
      // API 中，以 Body 传参
      data: {
        param: {
          username: sUsername,
          password: sPassword
        }
      }
    });

    return oResponse;
  }

  public static async postRefresh() {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Authentication/Authenticator/refresh',
      // API 中，问号拼接的 参数。 如 ?option={}&query={}
      params: {
        option: {},
        query: {}
      },
      // API 中，以 Body 传参
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
      // API 中，问号拼接的 参数。 如 ?option={}&query={}
      params: {
        option: {},
        query: {}
      },
      // API 中，以 Body 传参
      data: {
        param: {}
      },
      options: {}
    });

    return oResponse;
  }
}

export default Authenticator;
