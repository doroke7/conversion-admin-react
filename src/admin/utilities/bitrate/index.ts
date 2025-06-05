let cBitrate = (iValue: number = 0) => {
  let sResult = '';
  let iOutput = (iValue / 1024 / 1024);
  sResult = iOutput.toFixed(3);

  sResult = sResult + 'Mbit/s';

  return sResult;
};

export default cBitrate;
