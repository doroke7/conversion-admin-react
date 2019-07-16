const LARGE: string = '大';
const SMALL: string = '小';
const DEUCE: string = '和';
const UNKNOWN: string = '未知';
const SSC: string = 'SSC';
const PK10: string = 'PK10';
const K3: string = 'K3';
const KLSF: string = 'KLSF';

let cLast = (aNumbers: number[]): number | undefined => {
  let iLength = aNumbers.length;
  let iNumber = aNumbers[iLength - 1 ];
  return iNumber;
};

export default cLast;
