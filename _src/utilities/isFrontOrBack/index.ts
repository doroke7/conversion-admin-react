// const ODD: string = '前';
const FRONT_MULTIPLE: string = '前多';
// const EVEN: string = '双';
const BACK_MULTIPLE: string = '后多';
// const DEUCE: string = '和';
const DEUCE_MULTIPLE: string = '前后和';
const UNKNOWN: string = '未知';

let cIsFrontOrBack = (aNumbers: number[] | number): string => {
  let iCountFront = 0;
  let iCountBack = 0;
  if (!(aNumbers instanceof Array)) {
    aNumbers = [aNumbers, ];
  }
  aNumbers.forEach((iNumber) => {
    if (iNumber < 40) {
      iCountFront++;
      return;
    }
    if (iNumber > 40) {
      iCountBack++;
    }
  });
  // if (0 < iCountFront - iCountBack && 1 === aNumbers.length) {
  //   return FRONT;
  // }
  // if (0 > iCountFront - iCountBack && 1 === aNumbers.length) {
  //   return BACK;
  // }

  if (iCountFront - iCountBack > 0 && aNumbers.length > 1) {
    return FRONT_MULTIPLE;
  }
  if (iCountFront - iCountBack < 0 && aNumbers.length > 1) {
    return BACK_MULTIPLE;
  }

  // if (0 === iCountFront - iCountBACK && 1 === aNumbers.length) {
  //   return DEUCE;
  // }

  if (iCountFront - iCountBack === 0 && aNumbers.length > 1) {
    return DEUCE_MULTIPLE;
  }
  return UNKNOWN;
};

export default cIsFrontOrBack;
