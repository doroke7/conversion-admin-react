import React, { useContext, useEffect, useLayoutEffect } from 'react';

import style from './style';

function Counter(oProps: any): any {
  let oClasses: any = style(void 0);
  let [iCount, cSetCount] = React.useState<any>(0);

  useEffect(() => {
    let fNumber = Math.random();
    cSetCount(fNumber);
  }, []);

  return (
    <div>
      <div>数字:{iCount}</div>
    </div>
  );
}
export default Counter;
