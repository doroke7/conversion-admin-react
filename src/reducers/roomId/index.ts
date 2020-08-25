const oRoomId = (sRoomId: string = '', oAction: any) => {
  let _sRoomId = oAction.payload;

  switch (oAction.type) {
    case 'EDIT_ROOMID':
      sRoomId = _sRoomId;
      return sRoomId;
    default:
      return sRoomId;
  }
};

export default oRoomId;
