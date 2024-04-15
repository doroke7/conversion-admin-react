/**
 * TITLE: 放弃了 action 控制异步 API 请求的做法， 不好用
 * DATE: 2022-0809
 */
let oAction: any = {
  set: (oMe: any = {}) => {
    let oAction = {
      type: 'ME_SET',
      me: oMe
    };

    return oAction;
  }
};

export default oAction;
