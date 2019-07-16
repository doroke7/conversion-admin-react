const FISH: string = '鱼'; // 1
const SHRIMP: string = '虾'; // 2
const GOURD: string = '葫芦'; // 3
const GOLD: string = '金钱'; // 4
const CRAB: string = '蟹'; // 5
const COCK: string = '鸡'; // 6
const UNKNOWN: string = '未知';

let cIsFishOrShrimpOrCrab = (aNumbers: number[], iPosition: number): string => {
  let iNumber = aNumbers[iPosition];
  switch (iNumber) {
  case 1:
    return FISH;
  case 2:
    return SHRIMP;
  case 3:
    return GOURD;
  case 4:
    return GOLD;
  case 5:
    return CRAB;
  case 6:
    return COCK;
  default:
  }
  return UNKNOWN;
};

export default cIsFishOrShrimpOrCrab;
