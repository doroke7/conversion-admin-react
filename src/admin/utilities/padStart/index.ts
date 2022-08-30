let padStart = (sString: string, iLength: number, sPadString: string) => {
  let iNumber = sString.toString();
  return iNumber.padStart(iLength, sPadString);
};

export default padStart;
