import Helpers from '@/admin/Helpers/Index';

class AppUser {
  public static async getShow(oOption, oQuery = null) {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/Resource/AppUser/show',

      params: {
        option: {
          app_id: oOption?.app_id,
          page: (oOption?.page ?? 1) || 1,
          size: (oOption?.size ?? 10) || 10
        },
        search: {}
      },

      data: {
        param: {}
      }
    });

    return oResponse;
  }
}

export default AppUser;
