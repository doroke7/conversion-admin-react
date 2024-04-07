/**
 * TITLE: 放弃了 action 控制异步 API 请求的做法， 不好用
 * DATE: 2022-0809
 */
let oAction: any = {
  postSignIn: (oResponse: any) => {
    let oAction = {
      type: '/Admin/Authentication/Authenticator/postSignIn',
      authorization: oResponse?.headers?.['authorization'] ?? ''
    };

    return oAction;
  }
};

export default oAction;
