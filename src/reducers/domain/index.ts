const oDomain = (aDomains: any = [], oAction: any) => {
  let _aDomains = oAction.payload;
  let __aDomains: any = [];
  switch (oAction.type) {
    case 'SHOW_DOMAIN':
      for (let oDomain of aDomains) {
        if (oDomain['domain_id']) {
          oDomain['id'] = oDomain['domain_id'];
        }
        __aDomains.push(oDomain);
      }

      for (let oDomain of _aDomains) {
        if (oDomain['domain_id']) {
          oDomain['id'] = oDomain['domain_id'];
        }
        __aDomains.push(oDomain);
      }

      return __aDomains;
    default:
      return __aDomains;
  }
};

export default oDomain;
