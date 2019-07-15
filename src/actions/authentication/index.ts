let oAuthentication: any = {
  login: (aWords: any) => {
    return {
      type: 'LOGIN_AUTHENTICATION',
      payload: aWords
    };
  },


};

export default oAuthentication;
