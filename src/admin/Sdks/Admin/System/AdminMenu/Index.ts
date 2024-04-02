import Helpers from '@/admin/Helpers/Index';

class App {

  public static async getShowTree(iAppId: number) {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/System/AdminMenu/showTree',
      params: {
        option: {
          appId: iAppId
        },
        search: {}
      },
      data: {
        param: {}
      },
      options: {
      }
    });

    return oResponse;
  }
};

export default App;
