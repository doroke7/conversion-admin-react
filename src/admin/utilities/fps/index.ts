
let cFps = (sInput: string) => {
  let sResult = sInput;
  let bIncluded = sInput.includes('/');
  if (bIncluded) {
      let [sNimber, sDecimal] = sInput.split('/');
      let iNimber = parseFloat(sNimber);
      let iDecimal = parseFloat(sDecimal);
      let iResult = 0;
      if (iNimber != 0 && iDecimal != 0) {
        iResult = parseFloat(sNimber) / parseFloat(sDecimal);

      };
      sResult = iResult.toFixed(2);
  };

  if(!bIncluded) {
    let iNumber = parseFloat(sInput);
    if(Number.isNaN(iNumber)) {
      sResult = '-';
    }

    if(!Number.isNaN(iNumber)) {
      sResult = iNumber.toFixed(2);
    }
  };
  
  return sResult;
};
export default cFps;
