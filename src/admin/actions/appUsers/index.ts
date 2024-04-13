/**
 * TITLE: 放弃了 action 控制异步 API 请求的做法， 不好用
 * DATE: 2022-0809
 */
let oAction: any = {
  set: (aAppUsers: any[] = []) => {
    let oAction = {
      type: 'APP_USERS_SET',
      appUsers: aAppUsers
    };

    return oAction;
  }
};

export default oAction;
