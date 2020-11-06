const oDomain = (aDomains: any = [], oAction: any) => {
  let _aDomains = oAction.payload;
  let __aDomains: any = [];
  switch (oAction.type) {
    case 'SHOW_DOMAIN':
      __aDomains = [...aDomains, ..._aDomains];
      return __aDomains;
    default:
      return __aDomains;
  }
};

export default oDomain;
