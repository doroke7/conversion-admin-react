let cLinkToQuery = (sLink: any) => {
  let sQueries: any = {};
  if (sLink.indexOf('?') === -1 && sLink.indexOf('&') === -1) {
    return '';
  }
  let linkQuery = sLink.split('?')[1];
  let links = linkQuery.split('&');
  links.forEach((sKey: any) => {
    let key = sKey.split('=');
    sQueries[key[0]] = key[1];
  });
  return sQueries;
};
export default cLinkToQuery;
