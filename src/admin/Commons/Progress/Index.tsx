import React, { useEffect, useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import events from '@/admin/events/index';

import style from './style';

function Progress(oProps: any): any {
  let oClasses: any = style(void 0);

  let [oState, cSetState] = useState<any>({
    value: 0,
    status: false
  });

  useEffect(() => {
    let oInterval = setInterval(() => {

      if (oState.status) {
        cSetState((oOldState) => {
          let oNewState = { value: 0, status: false };
          if (oOldState.value === 100) {
            oNewState.value = 0;
            return oNewState;
          };
          if (oOldState.value < 100) {
            let iDiffValue = Math.random() * 20;
            oNewState.value = oOldState.value + iDiffValue;
          };

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
        let oNewState: any = { value: oProgress?.value ?? 0, status: oProgress.status };

        return oNewState;
      });
    };

    let oEventEmitter: any = events.addListener('Progress-onProgress', cOnProgress);
    return () => {
      events.removeListener('Progress-onProgress', cOnProgress);
    };
  }, []);

  return oState.value > 0 && oState.status ? (
    <LinearProgress className={oClasses.root} variant="determinate" value={oState.value} />
  ) : (
    ''
  );
}
export default Progress;
