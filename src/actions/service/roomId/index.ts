let oRoomIdAction: any = {
  show: (sRoomId: any) => {
    return {
      type: 'SHOW_ROOMID',
      payload: sRoomId
    };
  },
  edit: (sRoomId: any) => {
    return {
      type: 'EDIT_ROOMID',
      payload: sRoomId
    };
  }
};

export default oRoomIdAction;
