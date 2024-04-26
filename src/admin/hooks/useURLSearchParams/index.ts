import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function useURLSearchParams() {

  let oLocation = useLocation();
  let sSearch = oLocation.search;

  let oUrlSearchParams = new URLSearchParams(sSearch);

  return oUrlSearchParams;
};

export default useURLSearchParams;

