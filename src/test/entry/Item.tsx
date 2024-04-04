import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import style from './style';

function Item(oProps: any) {
  let oClasses: any = style(void 0);

  let [sName, cSetName] = useState('item ');

  return <div>{sName}</div>;
}

export default Item;
