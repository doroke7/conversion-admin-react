import jwtDecode from 'jwt-decode';

import Helpers from '@/Helpers/';



let cShow: any = (oRaw: any) => {
  return {
    type: 'SYSTEM_MENU',
    raw: oRaw
  };
};

let oMenuAction: any = {

  show(oParams: any, oData: any) {
    return async (cDispatch: any) => {
      let oResponse = await Helpers.Axios.post({
        path: '/Admin/System/Menu/show',
        params: oParams,
        data: oData
      });

      if (!oResponse) {
        throw new Error('网络异常');
      }

      if (-1 === oResponse.code || 200 != oResponse.status) {
        throw new Error(oResponse.message);
      }

      if (!oResponse.raw || !Object.prototype.hasOwnProperty.call(oResponse.raw, 'list') || !oResponse.raw.list) {
        throw new Error('接口格式异常');
      }

      return cDispatch(cShow(oResponse.raw));
    };
  }
};

export default oMenuAction;
