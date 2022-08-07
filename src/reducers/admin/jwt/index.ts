const oJwt = (sJwt: string = '', oAction: any) => {
  let _sJwt = oAction.payload ? oAction.payload : sJwt;

  switch (oAction.type) {
    case 'JWT_LOGIN':
      return _sJwt;
    case 'JWT_REFRESH':
      return _sJwt;
    default:
      // default 一定要使用 sJwt 的 原始值 效果有 俩个
      // 1. 对于 自己 这个 action 如果没匹配到 type ， 可以保证有 initial 值
      // 2. 对于 其他 action ，可以保持原数据
      return sJwt;
  }
};

export default oJwt;
