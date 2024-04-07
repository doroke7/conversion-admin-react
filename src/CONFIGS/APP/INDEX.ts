const APP: any = {
  ENV: process.env.APP_ENV ?? 'MASTER',
  CONTEXT_MENU: process.env.APP_CONTEXT_MENU ? JSON.parse(process.env.APP_CONTEXT_MENU.toLowerCase()) : false
};

export default APP;
