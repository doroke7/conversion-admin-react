let cSize = (iSize: number = 0) => {
  let iOutput = (iSize / 1024 / 1024 / 1024).toFixed(4);
  let sResult = iOutput + 'GB';


  return sResult;
};

export default cSize;
