const oRoomMessage = (iState: any = [], oAction: any) => {
  let iCount = oAction.count;
  let _iCount = iState;
  switch (oAction.type) {
    case 'ROOM_MESSAGE':
      _iCount++;
      return _iCount;
    default:
      return _iCount;
  }
};

export default oRoomMessage;