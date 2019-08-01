const oUserReducer = (oUsers: any = {}, oAction: any) => {
  let _oUsers = {};
  switch (oAction.type) {
    case 'SHOW_USER':
      let aUsers = oAction.payload;

      oUsers = aUsers.reduce((_oUsers: any, oUser: any) => {
        let sKey = oUser._id;
        _oUsers[sKey] = oUser;
        return _oUsers;
      }, oUsers);

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