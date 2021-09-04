let oDate = new Date();
let sY = oDate.getFullYear().toString().substr(-2);
let sM = (oDate.getMonth() + 1).toString().padStart(2, '0');
let sD = oDate.getDate().toString().padStart(2, '0');
let sVersion = sY + sM + sD;

const APP: any = {
  NAME: process.env.APP_NAME || '管理平台',
  DESCRIPTION: process.env.APP_DESCRIPTION || '© copyright 2020 超级科技版权所有',
  VERSION: process.env.APP_VERSION || sVersion
};

export default APP;
