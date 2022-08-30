let cDateTime = (iTime: number) => {
  let oDate = new Date(iTime * 1000);
  let sYear = oDate.getFullYear().toString();
  let sMonth = '0' + oDate.getMonth().toString();
  let sDate = '0' + oDate.getDate().toString();
  let sHours = '0' + oDate.getHours().toString();
  let sMinutes = '0' + oDate.getMinutes().toString();
  let sSeconds = '0' + oDate.getSeconds().toString();
  sMonth = sMonth.substring(sMonth.length - 2, sMonth.length);
  sDate = sDate.substring(sDate.length - 2, sDate.length);
  sHours = sHours.substring(sHours.length - 2, sHours.length);

  sMinutes = sMinutes.substring(sMinutes.length - 2, sMinutes.length);
  sSeconds = sSeconds.substring(sSeconds.length - 2, sSeconds.length);

  let sDateTime = sYear + '-' + sMonth + '-' + sDate + ' ' + sHours + ':' + sMinutes + ':' + sSeconds;
  return sDateTime;
};

export default cDateTime;
