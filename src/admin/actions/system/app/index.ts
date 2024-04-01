import Helpers from '@/admin/Helpers/Index';

let cShow: any = (oRaw: any) => {
  let oAction = {
    type: 'SYSTEM_APP',
    raw: oRaw
  };

  return oAction;
};

let oAppAction: any = {
  shows(oParams: any, oData: any) {
    return async (cDispatch: any) => {
      let oResponse = await Helpers.Axios.post({
        path: '/Admin/System/Spp/ShowOnes',
        params: oParams,
        data: oData
      });

      if (!oResponse) {
        throw new Error('网络异常');
      };

      if (-1 <= oResponse.code || 200 != oResponse?.status) {
        throw new Error(oResponse.message);
      };

      if (!oResponse.raw || !Object.prototype.hasOwnProperty.call(oResponse.raw, 'ones') || !oResponse.raw.list) {
        throw new Error('接口格式异常');
      };

      return cDispatch(cShow(oResponse.raw));
    };
  }
};

export default oAppAction;
