let cObjectQueriesToStringQueries = (oQueries: any) => {
  let sQueries: string = '';
  let iIndex: number = 0;
  for (let sKey of Object.keys(oQueries)) {
    let sKeyValue = sKey + '=' + oQueries[sKey];
    sQueries += (iIndex === 0 ? '?' + sKeyValue : '&' + sKeyValue);
    iIndex++;
  }
  return sQueries;
};
export default cObjectQueriesToStringQueries;
