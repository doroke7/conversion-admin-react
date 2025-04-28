
let cFps = (sInput: string) => {
  let sResult = sInput;
  let bIncluded = sInput.includes('/');
  if (bIncluded) {
      let [iNimber, iDecimal] = sInput.split('/');
      let iResult = parseFloat(iNimber) / parseFloat(iDecimal);
      sResult = iResult.toFixed(2);
  };

  if(!bIncluded) {
    sResult = parseFloat(sInput).toFixed(2);
  };
  
  return sResult;
};
export default cFps;
