import React, { useContext, useEffect, useLayoutEffect, Suspense } from 'react';
import UseRef2 from './UseRef2/Index';

import style from './style';

/**
 * import Config from './Config/'; 相当 import Config from './Config/Index.ts';
 * 
 * 
 * import Config from './Config/Index'; 打包不能相当 import Config from './Config/Index/index.tsx';
 * import Config from './Config/Index'; 打包可以相当 import Config from './Config/Index.tsx';
 * 
 * 
 * import Config from './Config'; 打包不能相当 import Config from './Config/index.tsx';
 * import Config from './Config'; 相当 import Config from './Config.tsx';

 */

function App(oProps: any) {
  let oClasses: any = style(void 0);

  return (
    <div>
      <UseRef2></UseRef2>
    </div>
  );
}

export default App;
