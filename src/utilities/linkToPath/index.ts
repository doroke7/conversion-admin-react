let cLinkToPath = (sLink: any) => {
  let iPosition = sLink.indexOf('?');
  if (iPosition === -1) {
    return '';
  }
  let Link = sLink.substr(0, iPosition);
  return Link;
};
export default cLinkToPath;
