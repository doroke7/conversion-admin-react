import AuthenticationHelper from '@/admin/Helpers/Authentication/Index';

let cReducer = (oAuhorizations: {} = {}, oAction: any) => {

  oAuhorizations = {
    ...oAuhorizations,
    ...(oAction.authorizations)
  };

  switch (oAction.type) {
    case 'AUTHORIZATIONS_SET':
      return oAuhorizations;

    default:
      return oAuhorizations;
  }
};

export default cReducer;
