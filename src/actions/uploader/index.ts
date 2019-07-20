let oUploaderAction: any = {

  willSend: (oUploader: any) => {
    return {
      type: 'WILL_SEND',
      payload: oUploader
    };
  },

  isSending: (oUploader: any) => {
    return {
      type: 'IS_SENDING',
      payload: oUploader
    };
  },


  didSend: (oUploader: any) => {
    return {
      type: 'DID_SEND',
      payload: oUploader
    };
  },

};

export default oUploaderAction;
