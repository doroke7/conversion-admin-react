import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import events from '@/events';

import style from './style';

function Progress(oProps: any): any {
  let oClasses: any = style(void 0);

  let [oState, cSetState] = React.useState<any>({
    value: 0,
    status: false
  });

  React.useEffect(() => {
    let oInterval = setInterval(() => {
      /**
       * React setState Hook 可以输入 callback function， 能使用 oldState
       */
      if (oState.status) {
        cSetState((oOldState) => {
          let oNewState = { value: 0, status: false };
          if (oOldState.value === 100) {
            oNewState.value = 0;
            return oNewState;
          }
          if (oOldState.value < 100) {
            let iDiffValue = Math.random() * 20;
            oNewState.value = oOldState.value + iDiffValue;
          }

          let iValue = Math.min(oNewState.value, 100);
          oNewState.value = iValue;
          oNewState.status = iValue < 100;
          return oNewState;
        });
      }
    }, 20);

    return () => {
      clearInterval(oInterval);
    };
  }, [oState.status]);

  useEffect(() => {
    let cOnProgress = (oProgress) => {
      cSetState((oOldState) => {
        let oNewState: any = { value: oOldState.value, status: oProgress.status };
        if (oProgress?.value) {
          oNewState.value = oProgress?.value;
        }
        return oNewState;
      });
    };

    let oEventEmitter: any = events.admin.addListener('Progress-onProgress', cOnProgress);
    return () => {
      events.admin.removeListener('Progress-onProgress', cOnProgress);
    };
  }, []);

  return oState.value > 0 && oState.status ? (
    <LinearProgress className={oClasses.root} variant="determinate" value={oState.value} />
  ) : (
    ''
  );
}
export default Progress;
