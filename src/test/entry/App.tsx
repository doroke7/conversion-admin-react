import React, { useContext, useEffect, useLayoutEffect, Suspense } from 'react';
import UseEffect from './UseEffect';
import style from './style';

function App(oProps: any) {
  let oClasses: any = style(void 0);

  return (
    <div>
      <UseEffect></UseEffect>
    </div>
  );
}

export default App;
