import Helpers from '@/admin/Helpers/Index';

class AppPipeline {
  public static async getShowOnes(oParam: any = {}, oOption: any = {}, oSearch: any = {}) {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/Resource/AppPipeline/showOnes',

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

  public static async getShowOne(oParam: any = {}, oOption: any = {}, oSearch: any = {}) {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/Resource/AppPipeline/showOne',

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
