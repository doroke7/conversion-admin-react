const oRoomMessage = (oRoomsMessages: any = {}, oAction: any) => {
  let aRoomsMessages = oAction.payload;

  switch (oAction.type) {
    case 'SHOW_ROOM_MESSAGE':

      oRoomsMessages = aRoomsMessages.reduce((_oRoomsMessages: any, oRoom: any) => {
        let sKey = oRoom._id;
        _oRoomsMessages[sKey] = oRoom;
        return _oRoomsMessages;
      }, oRoomsMessages);

      return oRoomsMessages;
    case 'WILL_SEND_ROOM_MESSAGE':
      oRoomsMessages = aRoomsMessages.reduce((_oRoomsMessages: any, oRoom: any) => {
        let sKey = oRoom._id;

        let aMessages = oRoom.messages;
        if (!_oRoomsMessages[sKey]) {
          _oRoomsMessages[sKey] = {
            messages: aMessages
          };
        };
        if (_oRoomsMessages[sKey]) {
          _oRoomsMessages[sKey].messages = [... _oRoomsMessages[sKey].messages, ...aMessages]
        }
        return _oRoomsMessages;
      }, oRoomsMessages);

      return oRoomsMessages;


    case 'DID_SEND_ROOM_MESSAGE':

      aRoomsMessages.forEach((oRoom: any) => {
        let sKey = oRoom._id;
        let aMessages = oRoom.messages;
        if (!oRoomsMessages[sKey]) {
          oRoomsMessages[sKey] = {
            messages: aMessages
          };
        };

        let _aMessages = [];
        for(let iIndex = 0 ; iIndex < aMessages.length; iIndex++) {
          let oMessage = aMessages[iIndex];
          if(!oMessage.virtualId){
            oRoomsMessages[sKey].messages.push(oMessage);
          }
          if(oMessage.virtualId){
            let oRoom = oRoomsMessages[sKey];
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

      return oRoomsMessages;
    default:
      return oRoomsMessages;
  }
};

export default oRoomMessage;