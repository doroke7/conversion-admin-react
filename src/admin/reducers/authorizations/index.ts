import AuthenticationHelper from '@/admin/Helpers/Authentication/Index';

let cReducer = (oAuthorizations: {} = {}, oAction: any) => {

  oAuthorizations = {
    ...oAuthorizations,
    ...(oAction.authorizations)
  };

  switch (oAction.type) {
    case 'AUTHORIZATIONS_SET':
      return oAuthorizations;

    default:
      return oAuthorizations;
  }
};

export default cReducer;
