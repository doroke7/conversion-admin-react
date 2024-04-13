
function useURLSearchParams() {
  let sWindowLocationSearch = window.location.search;
  let oUrlSearchParams = new URLSearchParams(sWindowLocationSearch);

  return oUrlSearchParams;
};

export default useURLSearchParams;

