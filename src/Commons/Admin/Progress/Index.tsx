import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

import LinearProgress from '@material-ui/core/LinearProgress';

import style from './style';

function Progress(oProps: any): any {
  let oClasses: any = style(void 0);

  let [oState, cSetState] = React.useState<any>({
    value: 0
  });

  React.useEffect(() => {
    let oInterval = setInterval(() => {
      /**
       * React setState Hook 可以输入 callback function， 能使用 oldState
       */
      cSetState((oOldState) => {
        let oNewState = { value: 0 };
        if (oOldState.value === 100) {
          oNewState.value = 0;
          return oNewState;
        }
        if (oOldState.value < 100) {
          let iDiffValue = Math.random() * 4;
          oNewState.value = oOldState.value + iDiffValue;
        }

        oNewState.value = Math.min(oNewState.value, 100);
        return oNewState;
      });
    }, 100);

    return () => {
      clearInterval(oInterval);
    };
  }, []);

  return oState.value > 0 ? (
    <LinearProgress className={oClasses.root} variant="determinate" value={oState.value} />
  ) : (
    ''
  );
}
export default Progress;
