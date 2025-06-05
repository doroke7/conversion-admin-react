/**
 * TITLE: 放弃了 action 控制异步 API 请求的做法， 不好用
 * DATE: 2022-0809
 */
let oAction: any = {
  set: (oAdminUser: any = {}) => {
    let oAction = {
      type: 'ADMIN_USER_SET',
      adminUser: oAdminUser
    };

    return oAction;
  }
};

export default oAction;
