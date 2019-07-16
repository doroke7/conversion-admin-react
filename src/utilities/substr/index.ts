let cSubstr = (mString: string | number | any, iPosition: number, iLength: number): string => {
  let sSubString = mString.toString().substr(iPosition, iLength);

  if (mString instanceof Array) {
    let sSubarray: any = mString[ iPosition ];
    return sSubarray;
  }
  return sSubString;
};

export default cSubstr;
