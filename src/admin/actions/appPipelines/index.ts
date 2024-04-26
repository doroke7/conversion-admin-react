/**
 * TITLE: 放弃了 action 控制异步 API 请求的做法， 不好用
 * DATE: 2022-0809
 */
let oAction: any = {
  set: (aAppPipelines: any[] = []) => {
    let oAction = {
      type: 'APP_PIPELINES_SET',
      appPipelines: aAppPipelines
    };

    return oAction;
  }
};

export default oAction;
