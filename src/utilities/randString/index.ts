let cRandString = (iLength = 8, iType = 0): string => {
  let sResult = '';
  let oTypesToStrings = {
    1: '0123456789',
    2: 'abcdefghijklmnopqrstuvwxyz',
    3: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    4: '~@#$%^&*(){}[]|'
  };

  let sStrings = oTypesToStrings[iType] || '';
  if (iType == 0) {
    sStrings = oTypesToStrings[1] + oTypesToStrings[2] + oTypesToStrings[3];
  }

  if (iType == -1) {
    sStrings = oTypesToStrings[1] + oTypesToStrings[2] + oTypesToStrings[3] + oTypesToStrings[4];
  }

  if (iType == 5) {
    sStrings = oTypesToStrings[1] + oTypesToStrings[2];
  }
  let iLastIndex = sStrings.length;
  let iIndex = 0;
  for (iIndex = 0; iIndex < iLength; iIndex++) {
    let iRandomIndex = Math.floor(Math.random() * iLastIndex);
    sResult += sStrings[iRandomIndex];
  }

  return sResult;
};

export default cRandString;
