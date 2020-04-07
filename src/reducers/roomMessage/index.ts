const oRoomMessage = (oRoomMessages: any = {}, oAction: any) => {
  let aRoomMessages = oAction.payload;

  switch (oAction.type) {
    case 'SHOW_ROOM_MESSAGE':

      oRoomMessages = aRoomMessages.reduce((_oRoomMessages: any, oRoom: any) => {
        let sKey = oRoom._id;
        _oRoomMessages[sKey] = oRoom;
        return _oRoomMessages;
      }, oRoomMessages);

      return oRoomMessages;
    case 'WILL_SEND_ROOM_MESSAGE':
      oRoomMessages = aRoomMessages.reduce((_oRoomMessages: any, oRoom: any) => {
        let sKey = oRoom._id;

        let aMessages = oRoom.messages;
        if (!_oRoomMessages[sKey]) {
          _oRoomMessages[sKey] = {
            messages: aMessages
          };
        };
        if (_oRoomMessages[sKey]) {
          _oRoomMessages[sKey].messages = [... _oRoomMessages[sKey].messages, ...aMessages]
        }
        return _oRoomMessages;
      }, oRoomMessages);

      return oRoomMessages;


    case 'DID_SEND_ROOM_MESSAGE':

      aRoomMessages.forEach((oRoom: any) => {
        let sKey = oRoom._id;
        let aMessages = oRoom.messages;
        if (!oRoomMessages[sKey]) {
          oRoomMessages[sKey] = {
            messages: aMessages
          };
        };

        let _aMessages = [];
        for(let iIndex = 0 ; iIndex < aMessages.length; iIndex++) {
          let oMessage = aMessages[iIndex];
          if(!oMessage.virtualId){
            oRoomMessages[sKey].messages.push(oMessage);
          }
          if(oMessage.virtualId){
            let oRoom = oRoomMessages[sKey];
            for(let _iIndex = oRoom.messages.length - 1; _iIndex >= 0; _iIndex--) {
              let _oMessage = oRoom.messages[_iIndex];
              if(_oMessage.virtualId == oMessage.virtualId) {
                _oMessage.loading = false;
                break;
              }
            }
          }
        }

      });

      return oRoomMessages;
    default:
      return oRoomMessages;
  }
};

export default oRoomMessage;