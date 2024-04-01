import Helpers from '@/admin/Helpers/Index';

class App {


  public static async getShowOnes() {
    let oResponse = await Helpers.Admin.post({
      path: '/Admin/System/App/showOnes',

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
