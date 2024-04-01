import React, {  useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import style from './style';

function Item(oProps: any) {
  let oClasses: any = style(void 0);
  let [oState, cSetState] = React.useState({
    name: 'item '
  });

  return <div>{oState.name}</div>;
}

export default Item;
