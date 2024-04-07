let adminMenuKey = (oAdminMenu: any) => {
  let sKey = String(oAdminMenu.appId) + '-' + String(oAdminMenu.id);
  return sKey;
};

export default adminMenuKey;
