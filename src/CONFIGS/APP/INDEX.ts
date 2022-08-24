const APP: any = {
  NAME: process.env.APP_NAME ?? '管理平台',
  DESCRIPTION: process.env.APP_DESCRIPTION ?? '© copyright 2022 超级科技版权所有',
  VERSION: process.env.APP_VERSION,
  VER: process.env.APP_VER ?? '1.7.0',
  ENV: process.env.APP_ENV ?? 'MASTER',
  AUTHENTICATOR: process.env.AUTHENTICATOR ?? true,
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
  ],
  SRC:
    process.env.APP_SRC ??
    'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik04OTYgMjEzLjMzMzMzM3YyODEuNmwtMTI4LTEyOC0xNzAuNjY2NjY3IDE3MC42NjY2NjctMTcwLjY2NjY2Ni0xNzAuNjY2NjY3LTE3MC42NjY2NjcgMTcwLjY2NjY2Ny0xMjgtMTI4VjIxMy4zMzMzMzNjMC00Ni45MzMzMzMgMzguNC04NS4zMzMzMzMgODUuMzMzMzMzLTg1LjMzMzMzM2g1OTcuMzMzMzM0YzQ2LjkzMzMzMyAwIDg1LjMzMzMzMyAzOC40IDg1LjMzMzMzMyA4NS4zMzMzMzN6IG0tMTI4IDI3My4wNjY2NjdsMTI4IDEyOFY4MTAuNjY2NjY3YzAgNDYuOTMzMzMzLTM4LjQgODUuMzMzMzMzLTg1LjMzMzMzMyA4NS4zMzMzMzNIMjEzLjMzMzMzM2MtNDYuOTMzMzMzIDAtODUuMzMzMzMzLTM4LjQtODUuMzMzMzMzLTg1LjMzMzMzM1Y1MjkuMDY2NjY3bDEyOCAxMjggMTcwLjY2NjY2Ny0xNzAuNjY2NjY3IDE3MC42NjY2NjYgMTcwLjY2NjY2NyAxNzAuNjY2NjY3LTE3MC42NjY2Njd6IiAgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=='
};

export default APP;
