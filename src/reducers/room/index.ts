const oRoom = (aRooms: any = [], oAction: any) => {
  let _aRooms = oAction.payload;

  switch (oAction.type) {
    case 'SHOW_ROOM':
      let __aRooms = [..._aRooms, ...aRooms];
      return __aRooms;
    default:
      return aRooms;
  }
};

export default oRoom;