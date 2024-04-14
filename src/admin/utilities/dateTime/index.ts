let cDateTime = (mTime: number | string) => {

  let sDateTime = '';

  if (typeof mTime == 'number') {
    let oDate = new Date(mTime * 1000);
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

    sDateTime = sYear + '-' + sMonth + '-' + sDate + ' ' + sHours + ':' + sMinutes + ':' + sSeconds;
  };

  if (typeof mTime == 'string') {
    let oDate = new Date(mTime);

    let sYear = oDate.getFullYear();
    let sMonth = ('0' + (oDate.getMonth() + 1)).slice(-2); 
    let sDate = ('0' + oDate.getDate()).slice(-2); 
    let sHours = ('0' + oDate.getHours()).slice(-2); 
    let sMinutes = ('0' + oDate.getMinutes()).slice(-2);
    let sSeconds = ('0' + oDate.getSeconds()).slice(-2); 
    
    sDateTime = sYear + '-' + sMonth + '-' + sDate + ' ' + sHours + ':' + sMinutes + ':' + sSeconds;
    
  };

  return sDateTime;
};

export default cDateTime;
