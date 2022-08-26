import Helpers from '@/Helpers/Index';

class AppUser {
  public static async getShow(oOption, oQuery = null) {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/Resource/AppUser/show',
      // API 中，问号拼接的 参数。 如 ?option={}&query={}
      params: {
        option: {
          app_id: oOption?.app_id,
          page: (oOption?.page ?? 1) || 1,
          limit: (oOption?.limit ?? 10) || 10
        },
        search: {}
      },
      // API 中，以 Body 传参
      data: {
        param: {}
      }
    });

    return oResponse;
  }
}

export default AppUser;
