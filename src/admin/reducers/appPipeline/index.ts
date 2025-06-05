import AuthenticationHelper from '@/admin/Helpers/Authentication/Index';

let cReducer = (oAppPipeline: any = {}, oAction: any) => {

  oAppPipeline = (oAction?.appPipeline ?? oAppPipeline);

  switch (oAction.type) {
    case 'APP_PIPELINE_SET':
      return oAppPipeline;
    default:
      return oAppPipeline;
  }
};

export default cReducer;
