const DRAGON: string = '龙';
const TIGER: string = '虎';
const DEUCE: string = '和';
const UNKNOWN: string = '未知';

let cIsDragonOrTiger = (aNumbers: number[], aPositions: number[]): string => {
  let iDragonNumber = aNumbers[aPositions[0]] === 0 ? 0 : aNumbers[aPositions[0]] || void 0;
  let iTigerNumber = aNumbers[aPositions[1]] === 0 ? 0 : aNumbers[aPositions[1]] || void 0;
  if (undefined === iDragonNumber || undefined === iTigerNumber) {
    return UNKNOWN;
  }
  if (iDragonNumber - iTigerNumber > 0) {
    return DRAGON;
  }

  if (iDragonNumber - iTigerNumber < 0) {
    return TIGER;
  }

  if (iDragonNumber - iTigerNumber === 0) {
    return DEUCE;
  }
  return UNKNOWN;
};

export default cIsDragonOrTiger;
