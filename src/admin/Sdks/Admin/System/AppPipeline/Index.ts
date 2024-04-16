import Helpers from '@/admin/Helpers/Index';

class AppPipeline {
  public static async postNotifyOne(oParam: any = {}, oOption: any = {}, oSearch: any = {}) {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Resource/AppPipeline/postNotifyOne',

      params: {
        option: oOption,
        search: oSearch
      },

      data: {
        param: oParam
      }
    });

    return oResponse;
  }

  public static async postTranscodeOne(oParam: any = {}, oOption: any = {}, oSearch: any = {}) {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/Resource/AppPipeline/postTranscodeOne',

      params: {
        option: oOption,
        search: oSearch
      },

      data: {
        param: oParam
      }
    });

    return oResponse;
  }
}

export default AppPipeline;
