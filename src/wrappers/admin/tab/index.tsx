import React, { useEffect } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';

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
    let oRouteMatch = useRouteMatch();
    let oParams = useParams();
    useEffect(() => {
      console.info('Tab-useEffect');
      return () => {};
    }, []);
    return <Component {...oProps}></Component>;
  }

  return Wrapper;
};

export default tab;
