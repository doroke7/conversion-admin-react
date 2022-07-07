const APP: any = {
  NAME: process.env.APP_NAME || '管理平台',
  DESCRIPTION: process.env.APP_DESCRIPTION || '© copyright 2022 超级科技版权所有',
  VERSION: process.env.APP_VERSION,
  VER: process.env.APP_VER || '1.7.0',
  ENV: process.env.APP_ENV || 'MASTER',
  APP_IDS: [
    {
      app_id: 1,
      text: '加菲猫'
    },
    {
      app_id: 2,
      text: '青山'
    },
    {
      app_id: 3,
      text: '松鼠'
    }
  ]
};

export default APP;
