import React, { useContext, useEffect, useLayoutEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';
import Grid from '@material-ui/core/Grid';

import UseEffectLifeCycle from './UseEffectLifeCycle/Index';
import UseEffect from './UseEffect/Index';

import Item from './Item';
import style from './style';

function App(oProps: any) {
  let oClasses: any = style(void 0);
  let [oState, cSetState] = React.useState({
    name: 'test 服务'
  });

  let bTrue = true;
  let bFalse = false;

  return (
    <div>
      {bFalse ? <UseEffectLifeCycle></UseEffectLifeCycle> : <div></div>}
      {bTrue ? <UseEffect></UseEffect> : <div></div>}
    </div>
  );
}

export default App;
