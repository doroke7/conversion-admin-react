let adminMenuKey = (oAdminMenu: any) => {
  let sKey = String(oAdminMenu?.appId ?? '0') + '-' + String(oAdminMenu?.id ?? '0');
  return sKey;
};

export default adminMenuKey;
