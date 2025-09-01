import Helpers from '@/admin/Helpers/Index';

class App {
  public static async getShowTree(oOption: any = {}, oSearch: any = {}, oParam: any = {}) {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/System/AdminMenu/showTree',
      params: {
        option: {
          ...oOption
        },
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
