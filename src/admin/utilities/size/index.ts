let cSize = (iSize: number = 0) => {
  let sResult = '';
  let iOutput = (iSize / 1024 / 1024);
  sResult = iOutput.toFixed(2);

  if (10000 <= iOutput) {
    sResult = iOutput.toFixed(1);
  } 
  if (100000 <= iOutput) {
    sResult = iOutput.toFixed(0);
  }

  sResult = sResult + 'MB';

  return sResult;
};

export default cSize;
