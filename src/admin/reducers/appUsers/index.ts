import AuthenticationHelper from '@/admin/Helpers/Authentication/Index';

let cReducer = (aAppUsers: any[] = [], oAction: any) => {

  aAppUsers = (oAction?.appUsers ?? aAppUsers);

  switch (oAction.type) {
    case 'APP_USERS_SET':
      return aAppUsers;
    default:
      return aAppUsers;
  }
};

export default cReducer;
