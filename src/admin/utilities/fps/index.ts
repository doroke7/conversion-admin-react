
let cFps = (sInput: string) => {
  let sResult = sInput;
  let bIncluded = sInput.includes('/');
  if (bIncluded) {
      let [iNimber, iDecimal] = sInput.split('/');
      let iResult = parseFloat(iNimber) / parseFloat(iDecimal);
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
