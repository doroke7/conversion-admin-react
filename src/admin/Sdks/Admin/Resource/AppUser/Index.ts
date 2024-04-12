import Helpers from '@/admin/Helpers/Index';

class AppUser {
  public static async getShowOnes(oParam: any = {}, oOption: any = {}, oSearch: any = {}) {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/Resource/AppUser/showOnes',

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

export default AppUser;
