let cPercentage = (iNumber: number = 0, iToFixed: number = 0) => {
  let iResult = (iNumber * 100).toFixed(iToFixed);
  let sResult = String(iResult);

  sResult = sResult.padStart(3, '') + '%';
  return sResult;
};

export default cPercentage;
