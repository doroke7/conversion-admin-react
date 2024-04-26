
let cReducer = (aAdminUsers: any[] = [], oAction: any) => {

  aAdminUsers = (oAction?.adminUsers ?? aAdminUsers);

  switch (oAction.type) {
    case 'ADMIN_USERS_SET':
      return aAdminUsers;
    default:
      return aAdminUsers;
  }
};

export default cReducer;
