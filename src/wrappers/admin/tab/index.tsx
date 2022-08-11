import React, { useEffect } from 'react';
import { useRouteMatch, useParams, useLocation } from 'react-router-dom';

interface Props {
  children?: any;
}

/*
 * NOTE: 小写，这是函数
 */

let tab = (Component: any): any => {
  function Wrapper(oProps: any) {
    let Icon = oProps.Icon ?? <></>;
    console.info('Tab-Index');
    let oLocation = useLocation();
    let oRouteMatch = useRouteMatch();
    let oParams = useParams();
    console.info(oLocation);
    console.info(oRouteMatch);
    console.info(oParams);

    useEffect(() => {
      console.info('Tab-useEffect');
      return () => {};
    }, []);
    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default tab;
