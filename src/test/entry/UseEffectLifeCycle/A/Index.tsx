import React, { useContext, useEffect, useLayoutEffect } from 'react';

import B from './B/Index';
import style from './style';

function A(oProps: any): any {
  let oClasses: any = style(void 0);

  console.info('A init');

  useEffect(() => {
    console.info('A useEffect');
  }, []);

  useLayoutEffect(() => {
    console.info('A useLayoutEffect');
  }, []);

  let [oState, cSetState] = React.useState<any>({
    value: 0,
    status: false
  });

  return (
    <div>
      <div>A</div>
      <B></B>
    </div>
  );
}
export default A;
