const oUserReducer = (oUsers: any = {}, oAction: any) => {
  let _oUsers = {};
  switch (oAction.type) {
    case 'SHOW_USER':
      _oUsers = oAction.payload;

      oUsers = {
        ...oUsers, 
        ..._oUsers
      };
      return oUsers;
    case 'SHOW_USER_VIA_MESSAGE':
        let aMessages = oAction.payload;
        oUsers = aMessages.reduce((__oUsers: any, oMessage: any) => {
          let oUser = oMessage.user;
          let sUserId = oUser._id;
          __oUsers[sUserId] = oUser;
          return __oUsers;
        }, oUsers);

        return oUsers;
    default:
      return oUsers;
  }
};

export default oUserReducer;