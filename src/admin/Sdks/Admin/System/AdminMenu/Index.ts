import Helpers from '@/admin/Helpers/Index';

class App {


  public static async getShowTree() {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/System/AdminMenu/showTree',
      params: {
        option: {},
        query: {}
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
