let oUploaderAction: any = {

  willSend: (oUploader: any) => {
    return {
      type: 'WILL_SEND_FILE',
      payload: oUploader
    };
  },

  didSend: (oUploader: any) => {
    return {
      type: 'DID_SEND_FILE',
      payload: oUploader
    };
  },

};

export default oUploaderAction;
