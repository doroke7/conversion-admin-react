import React, { useContext, useEffect, useLayoutEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

import Item from './Item';
import style from './style';

function App(oProps: any) {
  let oClasses: any = style(void 0);
  let [oState, cSetState] = React.useState({
    name: 'test 服务'
  });

  let C = React.lazy(() => import('./Item'));

  return (
    <div>
      <div>{oState.name}</div>
      <Suspense fallback={<div>LOADING</div>}>
        <C></C>
      </Suspense>
    </div>
  );
}

export default App;
