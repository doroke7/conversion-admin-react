let cSize = (iSize: number = 0) => {
  let sResult = '';
  let iOutput = (iSize / 1024 / 1024 / 1024);
  if (iOutput < 1) {
    sResult = iOutput.toFixed(4);
  }

  if (1 <= iOutput && iOutput < 10) {
    sResult = iOutput.toFixed(4);
  }

  if (10 <= iOutput && iOutput < 100) {
    sResult = iOutput.toFixed(3);
  }

  if (100 <= iOutput && iOutput < 1000) {
    sResult = iOutput.toFixed(2);
  }

  if (1000 <= iOutput && iOutput < 10000) {
    sResult = iOutput.toFixed(1);
  }

  if (10000 <= iOutput && iOutput < 100000) {
    sResult = iOutput.toFixed(0);
  }

  if (100000 <= iOutput) {
    sResult = iOutput.toFixed(0);
  }

  sResult = sResult + 'GB';


  return sResult;
};

export default cSize;
