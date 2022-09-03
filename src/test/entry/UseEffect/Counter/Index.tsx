import React, { useContext, useEffect, useLayoutEffect } from 'react';

import style from './style';

function Counter(oProps: any): any {
  let oClasses: any = style(void 0);
  let [iCount, cSetCount] = React.useState<any>(0);

  useEffect(() => {
    setTimeout(() => {
      let fNumber = Math.random() * 100;
      cSetCount(fNumber);
    }, 1000);
  }, []);

  return (
    <div>
      <div>数字:{iCount}</div>
    </div>
  );
}
export default Counter;
