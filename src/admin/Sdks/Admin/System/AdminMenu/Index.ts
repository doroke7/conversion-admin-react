import Helpers from '@/admin/Helpers/Index';

class App {


  public static async getShowTree() {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/System/AdminMenu/showTree',
      // API 中，问号拼接的 参数。 如 ?option={}&query={}
      params: {
        option: {},
        query: {}
      },
      // API 中，以 Body 传参
      data: {
        param: {}
      },
      options: {}
    });

    return oResponse;
  }
}

export default App;
