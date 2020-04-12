const oUserRoomReducer = (oUsersRooms: any = {}, oAction: any) => {
  let aUsersRooms;
  switch (oAction.type) {
    case 'SHOW_USER_ROOM':
      aUsersRooms = oAction.payload;

      oUsersRooms = aUsersRooms.reduce((_oUsersRooms: any, oUser: any) => {
        debugger;
        let sKey = oUser._id;
        if(!_oUsersRooms[oUser._id]) {
          oUsersRooms[oUser._id] = {
            rooms: {}
          };
        }

        let aRooms = oUser.rooms;

        oUsersRooms[oUser._id]['rooms'] = aRooms.reduce((_oRooms: any, oRoom: any) => {
          _oRooms[oRoom._id] = oRoom;
          return _oRooms;
        }, oUsersRooms[oUser._id]['rooms']);

        return _oUsersRooms;
      }, oUsersRooms);

      return oUsersRooms;
    default:
      return oUsersRooms;
  }
};

export default oUserRoomReducer;
