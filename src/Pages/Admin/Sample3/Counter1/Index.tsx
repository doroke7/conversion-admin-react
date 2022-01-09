import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'; // 点击事件是否发生在元素之外
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import fStyles from './style';

export default function Counter(oProps: any) {
  const [count, setCount] = React.useState(0);
  const [otherCounter, setOtherCounter] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  const incrementOtherCounter = () => {
    setOtherCounter(otherCounter + 1);
  };

  // 這裡的問題是，每當更新計數器時，都會重新創建所有3個功能。
  return (
    <>
      Counter: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={incrementOtherCounter}>incrementOtherCounter</button>
    </>
  );
}
