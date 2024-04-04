import Helpers from '@/admin/Helpers/Index';

class AdminUserLink {


  public static async getShowOnes() {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/System/AdminUserLink/showOnes',

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

export default AdminUserLink;
