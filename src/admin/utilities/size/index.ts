let cSize = (iSize: number = 0) => {
  let sResult = '';
  let iOutput = (iSize / 1024 / 1024 / 1024);
  if (iOutput < 1) {
    sResult = iOutput.toFixed(4);
  }

  if (iOutput >= 1) {
    sResult = iOutput.toFixed(2);

  }
  sResult = sResult + 'GB';


  return sResult;
};

export default cSize;
