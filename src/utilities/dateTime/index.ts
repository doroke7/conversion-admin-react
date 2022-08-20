let cDateTime = (iTime: number) => {
  let oDate = new Date(iTime * 1000);
  // Hours part from the timestamp
  let sHours = oDate.getHours();
  // Minutes part from the timestamp
  let sMinutes = '0' + oDate.getMinutes();
  // Seconds part from the timestamp
  let sSeconds = '0' + oDate.getSeconds();

  let sDateTime = sHours + ':' + sMinutes.substr(-2) + ':' + sSeconds.substr(-2);
  return sDateTime;
};

export default cDateTime;
