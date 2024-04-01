import Helpers from '@/admin/Helpers/Index';

class App {

  public static async getShowTree() {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/System/AdminMenu/showTree',
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

export default App;
