import Helpers from '@/admin/Helpers/Index';

class AppUser {
  public static async getShowOnes(oParam: any = {}, oOption: any = {}, oSearch: any = {}) {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/System/AppUser/showOnes',

      params: {
        option: {},
        search: {}
      },

      data: {
        param: {}
      },
      options: {}
    });

    return oResponse;
  }
}

export default AppUser;
