import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

import style from './style';

function Item(oProps: any) {
  let oClasses: any = style(void 0);
  let [oState, cSetState] = React.useState({
    name: 'item '
  });

  return <div>{oState.name}</div>;
}

export default Item;
