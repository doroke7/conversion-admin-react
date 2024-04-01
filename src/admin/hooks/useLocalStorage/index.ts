
import { useState } from 'react';

function useLocalStorage(sKey: string, oInitialValue: any) {
  const [oState, setState] = useState(() => {

    try {
      const sValue = window.localStorage.getItem(sKey);
      return sValue ? JSON.parse(sValue) : oInitialValue;
    } catch (oError) {
      console.error('Error reading localStorage:', oError);
      return oInitialValue;
    };
  });

  const setLocalStorage = (mValue: any) => {
    try {
      window.localStorage.setItem(sKey, JSON.stringify(mValue));
      setState(mValue);
    } catch (oError) {
      console.error('Error writing localStorage:', oError);
    };
  };

  return [oState, setLocalStorage];
};

export default useLocalStorage;

