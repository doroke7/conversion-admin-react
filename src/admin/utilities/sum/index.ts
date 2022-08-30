let cSum = (aNumbers: number[], aPositions?: number[] | null) => {
  let iSumation = 0;
  if (Array.isArray(aPositions)) {
    iSumation = aPositions.reduce((_iSumation: number, iCurrentPosition: number) => {
      _iSumation += aNumbers[iCurrentPosition];
      return _iSumation;
    }, iSumation);
    return iSumation;
  }
  iSumation = aNumbers.reduce((_iSumation: number, iCurrentNumber: number) => {
    _iSumation += iCurrentNumber;
    return _iSumation;
  }, iSumation);

  return iSumation;
};

export default cSum;
