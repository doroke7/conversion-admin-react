import React, { useEffect, useLayoutEffect } from 'react';

import style from './style';

function C(oProps: any): any {
  let oClasses: any = style(void 0);

  console.info('C init');

  useEffect(() => {
    console.info('C useEffect');
  }, []);

  useLayoutEffect(() => {
    console.info('C useLayoutEffect');
  }, []);

  let [oState, cSetState] = React.useState<any>({
    value: 0,
    status: false
  });

  return <div>C</div>;
}
export default C;
