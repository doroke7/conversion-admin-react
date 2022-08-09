import React, { ReactElement } from 'react';

interface Props {
  children?: any;
}

let authenticator = (Component: any): any => {
  function Wrapper(oProps: any) {
    /**
     * HOC 就是把组件 重新包装一次
     */
    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

function authenticator2(Component: any): any {
  return (oProps: any) => {
    /**
     * HOC 就是把组件 重新包装一次
     */
    return <Component {...oProps}></Component>;
  };
}

let authenticator3 = (Component: any) => (oProps: any) => <Component {...oProps}></Component>;

export default authenticator;
