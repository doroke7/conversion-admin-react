import React, { useContext, useEffect, useLayoutEffect, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';
import Grid from '@material-ui/core/Grid';

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
      <Grid container spacing={2}>
        <Grid item xl={4} spacing={6}>
          <div style={{ background: 'green' }}>green</div>
        </Grid>
        <Grid item xl={4} spacing={6}>
          <div style={{ background: 'yellow' }}>yellow</div>
        </Grid>
        <Grid item xl={4} spacing={6}>
          <div style={{ background: 'blue' }}>blue</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
