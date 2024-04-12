import AuthenticationHelper from '@/admin/Helpers/Authentication/Index';

let oAdminUserId = (iAdminUserId: number = 0, oAction: any) => {

  iAdminUserId = (oAction?.adminUserId ?? iAdminUserId) || iAdminUserId;

  switch (oAction.type) {
    case 'ADMIN_USER_ID':
      return iAdminUserId;
    default:
      return iAdminUserId;
  }
};

export default oAdminUserId;
