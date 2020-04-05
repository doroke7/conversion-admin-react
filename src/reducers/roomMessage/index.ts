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

    default:
      return oRoomMessages;
  }
};

export default oRoomMessage;