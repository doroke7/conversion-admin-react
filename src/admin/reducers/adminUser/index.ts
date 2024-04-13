import AuthenticationHelper from '@/admin/Helpers/Authentication/Index';

let cReducer = (oAdminUser: any = {}, oAction: any) => {

  oAdminUser = (oAction?.adminUser ?? oAdminUser);

  switch (oAction.type) {
    case 'ADMIN_USER_SET':
      return oAdminUser;
    default:
      return oAdminUser;
  }
};

export default cReducer;
