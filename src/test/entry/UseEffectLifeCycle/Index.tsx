import React, { useContext, useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import events from '@/admin/events/index';
import A from './A/Index';
import style from './style';

/**
 *
 * useEffect : 非同步 (asynchronously) 並在瀏覽器渲染完之後執行，
 * 代表使用者不需要等你 code 計算完就能看到畫面
   

   useLayoutEffect : 同步(synchronously) 並執行完才渲染畫面，
   代表使用者需要等你程式執行完才看得到畫面
 *
 */

function UseEffect(oProps: any): any {
  let oClasses: any = style(void 0);

  let [oState, cSetState] = React.useState<any>({
    value: 0,
    status: false
  });

  return (
    <div>
      <A></A>
    </div>
  );
}
export default UseEffect;
