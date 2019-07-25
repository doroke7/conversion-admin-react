let oUserAction: any = {

  show: (oUser: any) => {
    return {
      type: 'SHOW_USER',
      payload: oUser
    };
  },

  showViaMessage: (aMessages: any) => {
    debugger;
    return {
      type: 'SHOW_USER_VIA_MESSAGE',
      payload: aMessages
    };
  }
};

export default oUserAction;
