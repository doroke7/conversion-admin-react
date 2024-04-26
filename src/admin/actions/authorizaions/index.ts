/**
 * TITLE: 放弃了 action 控制异步 API 请求的做法， 不好用
 * DATE: 2022-0809
 */
let oAction: any = {
  set: (oAuthorizations: { [key: string]: string }) => {
    let oAction = {
      type: 'AUTHORIZATIONS_SET',
      authorizations: oAuthorizations
    };

    return oAction;
  }
};

export default oAction;
