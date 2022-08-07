import Helpers from '@/Helpers/';

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
}

export default Authenticator;
