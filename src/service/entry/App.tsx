import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import style from './style';

function App(oProps: any) {
  let oClasses: any = style(void 0);
  let [sName, cSetName] = useState('servie 服务');
  return <div>{sName}</div>;
};

export default App;
