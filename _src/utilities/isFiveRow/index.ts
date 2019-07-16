const GOLD: string = '金';
const TIMBER: string = '木';
const WATER: string = '水';
const FIRE: string = '火';
const SOIL: string = '土';
const UNKNOWN: string = '未知';

let cIsFiveRow = (aNumbers: number) => {
  if (aNumbers >= 210 && aNumbers <= 695) {
    return GOLD;
  }
  if (aNumbers >= 696 && aNumbers <= 763) {
    return TIMBER;
  }
  if (aNumbers >= 764 && aNumbers <= 855) {
    return WATER;
  }
  if (aNumbers >= 856 && aNumbers <= 923) {
    return FIRE;
  }
  if (aNumbers >= 924 && aNumbers <= 1410) {
    return SOIL;
  }
  if (aNumbers >= 0 && aNumbers <= 210) {
    return UNKNOWN;
  }
};

export default cIsFiveRow;
