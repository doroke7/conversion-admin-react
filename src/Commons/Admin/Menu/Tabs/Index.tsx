import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
  tab
} from '@/contexts';

import style from './style';

function Tabs() {
  let aTabs = useContext(tab);
  console.log(aTabs);
  return (
    <div>
      <span>A</span>
      <span>B</span>
    </div>
  );
}

export default Tabs;