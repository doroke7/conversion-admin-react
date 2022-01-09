import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Counter1 from './Counter1/Index';
import Counter2 from './Counter2/Index';
import fStyles from './style';

export default function Sample3() {
  const oClasses = fStyles();

  return (
    <div className={oClasses.root}>
      <Counter2></Counter2>
    </div>
  );
}
