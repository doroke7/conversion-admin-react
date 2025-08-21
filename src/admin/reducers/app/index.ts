
let cReducer = (oApp: any = {}, oAction: any) => {

  oApp = (oAction?.app ?? oApp);

  switch (oAction.type) {
    case 'APP_SET':
      return oApp;
    default:
      return oApp;
  }
};

export default cReducer;
