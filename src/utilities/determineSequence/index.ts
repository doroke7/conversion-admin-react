const HALT_STRAIGHT: string = '半顺';
const STRAIGHT: string = '顺子';
const PAIR: string = '对子';
const TRIP: string = '三点一样';
const SAME: string = '豹子';
const MESS: string = '杂六';
const UNKNOWN: string = '未知';

let cDetermineSequence = (aNumbers: number[], aPositions: number[], iMin: number, iMax: number): string => {
  let _aNumbers: number[] = [];
  let iStraightCount: number = 0;
  let iSameCount: number = 0;

  _aNumbers = aPositions.map((iPosition) => {
    let iNumber = aNumbers[iPosition];
    return iNumber;
  });
  _aNumbers = _aNumbers.sort((iPreviousNumber: number, iNextNumber: number) => {
    return iPreviousNumber - iNextNumber;
  });

  _aNumbers.reduce((iPreviousNumber: number, iNextNumber: number): number => {
    if (undefined === iPreviousNumber) {
      return iNextNumber;
    }

    if (iNextNumber - iPreviousNumber === 0) {
      iSameCount += 1;
    }

    if (iNextNumber - iPreviousNumber === 1) {
      iStraightCount += 1;
    }

    return iNextNumber;
  });

  if (iMax - iMin === _aNumbers[_aNumbers.length - 1] - _aNumbers[0]) {
    iStraightCount += 1;
  }

  if (iSameCount >= 1) {
    iSameCount += 1;
  }

  if (iStraightCount >= 1) {
    iStraightCount += 1;
  }

  if (iSameCount === 0 && iStraightCount === 0) {
    return MESS;
  }

  if (iSameCount === 2 && _aNumbers.length > iSameCount) {
    return PAIR; // 对子的优先级高于 半顺
  }

  if (iStraightCount >= 2 && _aNumbers.length > iStraightCount) {
    return HALT_STRAIGHT;
  }

  if (_aNumbers.length === iStraightCount) {
    return STRAIGHT;
  }

  if (iSameCount === 2 && _aNumbers.length > iSameCount) {
    return PAIR;
  }

  if (iSameCount === 3 && _aNumbers.length > iSameCount) {
    return TRIP;
  }

  if (_aNumbers.length === iSameCount) {
    return SAME;
  }
  return UNKNOWN;
};

export default cDetermineSequence;
