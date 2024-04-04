import React, { useEffect } from 'react';

interface Props {
  children?: any;
}

/*
 * NOTE: 小写，这是函数
 */

let title = (Component: any): any => {
  function Wrapper(oProps: any) {
    let sTitle = oProps.title ?? '';
    useEffect(() => {
      document.title = sTitle;
    }, []);
    return <Component {...oProps}></Component>;
  };

  return Wrapper;
};

export default title;
