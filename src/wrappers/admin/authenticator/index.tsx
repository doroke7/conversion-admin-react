import React, { ReactElement, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Sdks from '@/Sdks';
import Helpers from '@/Helpers';
import CONFIGS from '@/CONFIGS';

interface Props {
  children?: any;
}

let authenticator = (Component: any): any => {
  function Wrapper(oProps: any) {
    let oHistory = useHistory();
    let bAuthenticator = oProps.authenticator ?? false;
    let aRedirections = oProps.redirections ?? [null, null];

    useEffect(() => {
      let cRefresh = async () => {
        if (CONFIGS.APP.AUTHENTICATOR) {
          if (bAuthenticator) {
            let sJwt = Helpers.Authentication.getJwt() ?? '';
            if (sJwt == '' && aRedirections[1]) {
              oHistory.push(aRedirections[1]);
            }
            if (sJwt) {
              let oResponse = Sdks.Admin.Authentication.Authenticator.postRefresh();
            }
          }
        }
      };
      if (CONFIGS.APP.AUTHENTICATOR) {
        cRefresh();
      }
    }, []);

    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

let authenticator3 = (Component: any) => (oProps: any) => <Component {...oProps}></Component>;

export default authenticator;
