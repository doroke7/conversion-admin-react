const oRoom = (oRooms: any = {}, oAction: any) => {
  let _oRooms = {};
  let aRooms;
  switch (oAction.type) {
    case 'SHOW_ROOM':
      aRooms = oAction.payload;

      oRooms = aRooms.reduce((_oRooms: any, oRoom: any) => {
        let sKey = oRoom._id;
        _oRooms[sKey] = oRoom;
        return _oRooms;
      }, oRooms);

      return oRooms;


    default:
      return oRooms;
  }
};

export default oRoom;