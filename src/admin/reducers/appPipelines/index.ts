
let cReducer = (aAppPinelines: any[] = [], oAction: any) => {

  aAppPinelines = (oAction?.appPipelines ?? aAppPinelines);

  switch (oAction.type) {
    case 'APP_PiPELINES_SET':
      return aAppPinelines;
    default:
      return aAppPinelines;
  }
};

export default cReducer;
