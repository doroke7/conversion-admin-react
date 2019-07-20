const oUploaderActioneducer = (oUploaders: any = {}, oAction: any) => {
  let _oUploaders = oAction.payload;
  switch (oAction.type) {
    case 'WILL_SEND':
      oUploaders = { ...oUploaders, ..._oUploaders}
      return oUploaders;
    case 'IS_SENDING':
      oUploaders = { ...oUploaders, ..._oUploaders}
      return oUploaders;    
    case 'DID_SEND':
      return oUploaders;
    default:
      return oUploaders;
  }
};

export default oUploaderActioneducer;