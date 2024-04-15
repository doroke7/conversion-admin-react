
let cReducer = (oMe: any = {}, oAction: any) => {

  oMe = (oAction?.me ?? oMe);

  switch (oAction.type) {
    case 'ME_SET':
      return oMe;
    default:
      return oMe;
  }
};

export default cReducer;
