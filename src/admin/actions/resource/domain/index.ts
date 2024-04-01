import Helpers from '@/admin/Helpers/Index';

let cShow: any = (aDmains: any) => {

  let oAction = {
    type: 'SHOW_DOMAIN',
    payload: aDmains
  };

  return oAction;
};

let oDomain: any = {
  show(oBody: any) {
    let sQuery = '{ domains { domain_id server type path weight status added_time edited_time removed_time } }';
    return async (cDispatch: any) => {
      let oResponse = await Helpers.Axios.get({
        path: '/admin/resource/graphql/query?query=' + sQuery
      });

      if (!oResponse) {
        throw new Error('THE_NETWORK_IS_ERROR');
      };

      if (-1 <= oResponse.code || 200 != oResponse?.status) {
        throw new Error(oResponse.key);
      };

      if (!oResponse.data || !oResponse.data.domains) {
        throw new Error('THE_API_IS_ERROR');
      };

      if (oResponse.data && oResponse.data.domains) {
        cDispatch(cShow(oResponse.data.domains));
      };
    };
  }
};

export default oDomain;
