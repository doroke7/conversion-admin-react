import React, { useContext, useEffect, useLayoutEffect } from 'react';
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
  let oClasses: any = style(void 0);

  let [iCount, cSetCount] = React.useState<any>(0);

  let cHandleClick = (oEvent: any) => {
    let fNumber = Math.random();
    cSetCount(fNumber);
  };

  return (
    <div>
      <div onClick={cHandleClick}>CLICK</div>
      <Counter count={iCount}></Counter>
    </div>
  );
}
export default UseEffect;
