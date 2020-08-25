const oUserRoomReducer = (oUsersRooms: any = false, oAction: any) => {
  let aUsersRooms;
  let aRooms = [];
  switch (oAction.type) {
    case 'SHOW_USER_ROOM':
      if (false === oUsersRooms) {
        oUsersRooms = {};
      }
      aUsersRooms = oAction.payload;

      oUsersRooms = aUsersRooms.reduce((_oUsersRooms: any, oUser: any) => {
        if (!_oUsersRooms[oUser._id]) {
          oUsersRooms[oUser._id] = {
            rooms: {}
          };
        }

        aRooms = oUser.rooms;

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
