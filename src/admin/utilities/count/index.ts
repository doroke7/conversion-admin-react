const EVEN = 'EVEN';
const ODD = 'ODD';
const LESS_THAN = 'LESS_THAN';
const MORE_THAN = 'MORE_THAN';

let cCount = (aNumbers: number[], sType: string, iBoundary: number): number => {
  let iCount: number = 0;
  aNumbers.forEach((iNumber) => {
    if (iNumber % 2 === 0 && EVEN === sType) {
      iCount += 1;
      return;
    }
    if (iNumber % 2 === 1 && ODD === sType) {
      iCount += 1;
      return;
    }
    if (iNumber <= iBoundary && LESS_THAN === sType) {
      iCount += 1;
      return;
    }
    if (iNumber >= iBoundary && MORE_THAN === sType) {
      iCount += 1;
    }
  });
  return iCount;
};

export default cCount;
