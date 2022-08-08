import React, { ReactElement } from 'react';

interface Props {
  children?: any;
}

function Authenticator(Component: any): any {
  return function (oProps: any) {
    /**
     * HOC 就是把组件 重新包装一次
     */
    return <Component {...oProps}></Component>;
  };
}

function Authenticator2(Component: any): any {
  return (oProps: any) => {
    /**
     * HOC 就是把组件 重新包装一次
     */
    return <Component {...oProps}></Component>;
  };
}

let Authenticator3 = (Component: any) => (oProps: any) => <Component {...oProps}></Component>;

export default Authenticator;
