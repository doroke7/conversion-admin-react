const oCounter = (iState: any = [], oAction: any) => {
  let iCount = oAction.count;
  let _iCount = iState;
  switch (oAction.type) {
    case 'ADD':
      _iCount++;
      return _iCount;
    default:
      return _iCount;
  }
};

export default oCounter;