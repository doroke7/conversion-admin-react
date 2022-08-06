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
      cSetState((oOldState) => {
        let oNewState = { value: 0 };
        if (oOldState.value === 100) {
          oNewState.value = 0;
        }
        let iDiffValue = Math.random() * 10;
        oNewState.value = oOldState.value + iDiffValue;
        return oNewState;
      });
    }, 500);

    return () => {
      clearInterval(oInterval);
    };
  }, []);

  return <LinearProgress variant="determinate" value={oState.value} />;
}
export default Progress;
