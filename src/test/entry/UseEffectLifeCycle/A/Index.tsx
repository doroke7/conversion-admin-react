import React, { useEffect, useLayoutEffect } from 'react';

import B from './B/Index';
import style from './style';

function A(oProps: any): any {
  let oClasses: any = style(void 0);


  useEffect(() => {
  }, []);

  useLayoutEffect(() => {
  }, []);

  return (
    <div>
      <div>A</div>
      <B></B>
    </div>
  );
}
export default A;
