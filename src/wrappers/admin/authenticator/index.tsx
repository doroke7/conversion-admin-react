import React, { ReactElement } from 'react';

interface Props {
  children?: any;
}

let authenticator = (Component: any): any => {
  function Wrapper(oProps: any) {
    let bAuthenticator = oProps.authenticator ?? false;
    if (bAuthenticator) {
      //
    }
    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

let authenticator3 = (Component: any) => (oProps: any) => <Component {...oProps}></Component>;

export default authenticator;
