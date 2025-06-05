/**
 * TITLE: 放弃了 action 控制异步 API 请求的做法， 不好用
 * DATE: 2022-0809
 */
let oAction: any = {
  set: (oAppPipeline: any = {}) => {
    let oAction = {
      type: 'APP_PIPELINE_SET',
      appPipeline: oAppPipeline
    };

    return oAction;
  }
};

export default oAction;
