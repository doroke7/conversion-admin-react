const ODD: string = '单';
const ODD_MULTIPLE: string = '单多';
const EVEN: string = '双';
const EVEN_MULTIPLE: string = '双多';
const DEUCE: string = '和';
const DEUCE_MULTIPLE: string = '单双和';
const UNKNOWN: string = '未知';
let cIsOddOrEven = (aNumbers: number[] | number, aDeuceNumbers: number[] ): string => {
  let iCountOdd = 0;
  let iCountEven = 0;
  let iCountDeuce = 0;

  if (!(aNumbers instanceof Array)) {
    aNumbers = [aNumbers, ];
  }

  if (!(aDeuceNumbers instanceof Array)) {
    aDeuceNumbers = [aDeuceNumbers, ];
  }
  aNumbers.forEach((iNumber) => {
    if (aDeuceNumbers.includes(iNumber)) {
      iCountDeuce++;
      return;
    }
    if (iNumber % 2 === 1) {
      iCountOdd++;
      return;
    }
    if (iNumber % 2 === 0) {
      iCountEven++;
    }
  });
  if (iCountEven < iCountOdd && iCountDeuce < iCountOdd && aNumbers.length === 1) {
    return ODD;
  }
  if (iCountOdd  < iCountEven && iCountDeuce < iCountEven && aNumbers.length === 1) {
    return EVEN;
  }

  if (iCountEven < iCountOdd && iCountDeuce < iCountOdd&& aNumbers.length > 1) {
    return ODD_MULTIPLE;
  }
  if (iCountOdd < iCountEven && iCountDeuce < iCountEven && aNumbers.length > 1) {
    return EVEN_MULTIPLE;
  }

  if (iCountOdd === iCountEven && aNumbers.length === 1) {
    return DEUCE;
  }

  if (iCountEven < iCountDeuce && iCountOdd < iCountDeuce && aNumbers.length === 1) {
    return DEUCE;
  }

  if (iCountEven < iCountDeuce && iCountOdd < iCountDeuce && iCountOdd  === iCountEven && aNumbers.length > 1) {
    return DEUCE_MULTIPLE;
  }

  return UNKNOWN;
};

export default cIsOddOrEven;
