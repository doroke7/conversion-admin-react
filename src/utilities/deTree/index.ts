let cDeTree = (aTree: any, sProperty: string = 'children', sType: string = 'object', sKey: string = 'id'): any => {
  let mResult: any;

  let cNext = (aTree: any, sProperty: string = 'children', sType: string = 'object', sKey: string = 'id'): any => {
    let mResult: any;
    let oObject = {};
    let aArray = [];

    let iLength = aTree.length;
    let iIndex = 0;
    for (iIndex = 0; iIndex < iLength; iIndex++) {
      let oRow = aTree[iIndex];
      let _mResult: any;
      if (Object.prototype.hasOwnProperty.call(oRow, sProperty)) {
        let aChildren = oRow[sProperty];
        _mResult = cNext(aChildren, sProperty, sType, sKey);
        delete oRow[sProperty];
      }

      if (sType == 'object') {
        oObject[oRow[sKey]] = oRow;
        if (_mResult) {
          oObject = {
            ...oObject,
            ..._mResult
          };
        }
      }

      if (sType == 'array') {
        aArray.push(oRow);
        if (_mResult) {
          aArray = [aArray, ..._mResult];
        }
      }
    }
    mResult = sType == 'object' ? oObject : aArray;
    return mResult;
  };

  mResult = cNext(aTree, sProperty, sType, sKey);

  return mResult;
};

export default cDeTree;
