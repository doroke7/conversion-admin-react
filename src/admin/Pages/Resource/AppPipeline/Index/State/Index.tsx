import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import clsx from 'clsx';

import style from './style';
import { setTimeout } from 'timers';

function Index(oProps: any): any {
  let iValue = oProps?.value ?? 0;
  let iId = oProps?.id ?? 0;
  let oClasses: any = style(void 0);

  let [iStateStep, cSetStateStep] = useState<number>(0);

  let oStates = {
    0: '未启动',
    1: '下载中',
    2: '转码中',
    3: '加密中',
    4: '上传中',
    5: '回调中',
    6: '预热中',
    254: '已完成',
  };

  let sState = oStates[iValue ?? 0];


  useEffect(() => {
    (async () => {

      await new Promise((cResolve, cReject) => { setTimeout(() => { cResolve(true); }, 50) });
      cSetStateStep((iPreStateStep) => {
        let iNextStateValue = iPreStateStep >= iValue ? iValue : iPreStateStep + 1;
        return iNextStateValue;
      });
    })();

  }, [iStateStep, iValue]);

  return (
    <Tooltip title={sState} placement="right">
      <div className={oClasses.root}>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iStateStep >= 1 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iStateStep >= 2 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iStateStep >= 3 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iStateStep >= 4 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iStateStep >= 5 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iStateStep >= 6 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iStateStep >= 7 })}></div>

      </div>
    </Tooltip>

  );
}
export default Index;
