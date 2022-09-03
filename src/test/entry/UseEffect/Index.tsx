import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import events from '@/admin/events/index';
import Counter from './Counter/Index';
import style from './style';

function UseEffect(oProps: any): any {
  const [count, setCount] = useState(0);

  useEffect(() => {
    sleep(5000);
    setCount(98);
  }, []);

  return <div>{count}</div>;
}
export default UseEffect;

function sleep(duration) {
  const start = Date.now();
  let end = start;
  while (end < start + duration) {
    end = Date.now();
  }
}
