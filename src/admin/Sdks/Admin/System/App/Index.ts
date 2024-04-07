import Helpers from '@/admin/Helpers/Index';

class App {
  public static async getShowOnes() {
    let oResponse = await Helpers.Admin.get({
      path: '/Admin/System/App/showOnes',

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
