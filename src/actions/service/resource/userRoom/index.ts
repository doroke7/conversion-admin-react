let oUserRoomAction: any = {
  show: (aUsersRooms: any) => {
    return {
      type: 'SHOW_USER_ROOM',
      payload: aUsersRooms
    };
  }
};

export default oUserRoomAction;
