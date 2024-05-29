import Helpers from '@/admin/Helpers/Index';

class Server {
  public static async getShowOnes(oParam: any = {}, oOption: any = {}, oSearch: any = {}) {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/System/Server/showOnes',

      params: {
        option: oOption,
        search: oSearch
      },

      data: {
        param: oParam
      },
      options: {}
    });

    return oResponse;
  }
}

export default Server;
