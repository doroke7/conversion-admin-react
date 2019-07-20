const oUploaderActioneducer = (oUploaders: any = {}, oAction: any) => {
  let _oUploaders = oAction.payload;
  oUploaders = { ...oUploaders, ..._oUploaders}
  switch (oAction.type) {
    case 'WILL_SEND_FILE':
      return oUploaders;
    case 'DID_SEND_FILE':
      return oUploaders;
    default:
      return oUploaders;
  }
};

export default oUploaderActioneducer;