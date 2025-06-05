import Helpers from '@/admin/Helpers/Index';

class Redis {
  public static async postFlushall(oParam: any = {}, oOption: any = {}, oSearch: any = {}) {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/System/Redis/flushall',

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

export default Redis;
