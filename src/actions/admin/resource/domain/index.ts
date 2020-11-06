import { AxiosHelper, AuthenticationHelper } from '@/Helpers/';

let cShow: any = (sJwt: any) => {
  return {
    type: 'DOMAIN_SHOW',
    payload: sJwt
  };
};

let oDomain: any = {
  show(oBody: any) {
    let sQuery = '{ domains { server type path  weight status added_time edited_time removed_time } }';
    return async (cDispatch: any) => {
      let oResponse = await AxiosHelper.get({
        path: '/admin/resource/graphql/query?query=' + sQuery
      });

      if (!oResponse) {
        throw new Error('THE_NETWORK_IS_ERROR');
      }

      if (-1 === oResponse.status) {
        throw new Error(oResponse.key);
      }

      cDispatch(cShow());
    };
  }
};

export default oDomain;
