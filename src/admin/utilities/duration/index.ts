let cDuration = (iSecond: number, bSecond = false) => {

  if (isNaN(iSecond)) return '00:00:00.00';

  let sSecond = iSecond.toFixed(2);
  let iHours = Math.floor(iSecond / 3600);
  let iMinutes = Math.floor((iSecond % 3600) / 60);
  let iSeconds = Math.floor(iSecond % 60);
  let iCentiseconds = Math.floor((iSecond * 100) % 100); // 保留两位小数部分

  // 补零函数
  let cPad = (iNumber : number, size = 2) => iNumber.toString().padStart(size, '0');


  let sResult = `${cPad(iHours)}:${cPad(iMinutes)}:${cPad(iSeconds)}.${cPad(iCentiseconds)}`;

  sResult = bSecond ? sResult + '(' + sSecond + ')' : sResult;

  return sResult;
};

export default cDuration;
