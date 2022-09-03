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
