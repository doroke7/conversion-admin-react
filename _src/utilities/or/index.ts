let cOr = (mFirstValue: any, mSecondValue: any): any => {
  let mResultValue = mFirstValue;
  if (undefined === mFirstValue || mFirstValue === '') {
    mResultValue = mSecondValue;
  }
  return mResultValue;
};

export default cOr;
