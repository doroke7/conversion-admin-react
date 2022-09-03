import React, { useContext, useEffect, useLayoutEffect } from 'react';

import style from './style';

function Counter(oProps: any): any {
  let oClasses: any = style(void 0);
  let iCount = oProps.count ?? 0;

  return (
    <div>
      <div>数字:{iCount}</div>
    </div>
  );
}
export default Counter;
