const oRoom = (oRooms: any = {}, oAction: any) => {
  let _oRooms = {};
  let aRooms;
  let sKey = '';
  switch (oAction.type) {
    case 'SHOW_ROOM':
      aRooms = oAction.payload;

      oRooms = aRooms.reduce((_oRooms: any, oRoom: any) => {
        sKey = oRoom._id;
        _oRooms[sKey] = oRoom;
        return _oRooms;
      }, oRooms);

      return oRooms;

    case 'DID_SEND_ROOM':
      aRooms = oAction.payload;

      oRooms = aRooms.reduce((_oRooms: any, oRoom: any) => {
        sKey = oRoom._id;
        if (_oRooms[sKey]) {
          _oRooms[sKey].messages = oRoom.messages;
        }

        if (_oRooms[sKey] && oRoom.count != _oRooms[sKey].count) {
          _oRooms[sKey].count = oRoom.count;
        }
        if (!_oRooms[sKey]) {
          _oRooms[sKey] = oRoom;
        }

        return _oRooms;
      }, oRooms);

      return oRooms;

    default:
      return oRooms;
  }
};

export default oRoom;
