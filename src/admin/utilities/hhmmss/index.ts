
let cHhmmss = (iSecond: number): string => {
  let iHh = Math.floor(iSecond / 3600);
  let iMm = Math.floor(iSecond % 3600 / 60);
  let iSs = Math.floor(iSecond % 3600 % 60);

  let sHh = iHh > 0 ? (iHh < 10 ? '0' + iHh : iHh) + ':' : '';
  let sMm = iMm > 0 ? (iMm < 10 ? '0' + iMm : iMm) + ':' : '00:';
  let sSs = iSs > 0 ? (iSs < 10 ? '0' + iSs : iSs) : '00';

  let sResult = sHh + sMm + sSs;
  return sResult; 
};

export default cHhmmss;
