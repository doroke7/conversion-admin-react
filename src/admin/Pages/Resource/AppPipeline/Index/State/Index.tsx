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
    <Tooltip title={sState} placement="top">
      <div className={oClasses.root}>
        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: false,
            [oClasses.innerBlockNone]: 1 > iStateStep,
            [oClasses.innerBlockOnging]: 1 == iStateStep,
            [oClasses.innerBlockSuccess]: 1 < iStateStep,

          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: false,
            [oClasses.innerBlockNone]: 2 > iStateStep,
            [oClasses.innerBlockOnging]: 2 == iStateStep,
            [oClasses.innerBlockSuccess]: 2 < iStateStep,

          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: false,
            [oClasses.innerBlockNone]: 3 > iStateStep,
            [oClasses.innerBlockOnging]: 3 == iStateStep,
            [oClasses.innerBlockSuccess]: 3 < iStateStep,

          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: false,
            [oClasses.innerBlockNone]: 4 > iStateStep,
            [oClasses.innerBlockOnging]: 4 == iStateStep,
            [oClasses.innerBlockSuccess]: 4 < iStateStep,

          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: false,
            [oClasses.innerBlockNone]: 5 > iStateStep,
            [oClasses.innerBlockOnging]: 5 == iStateStep,
            [oClasses.innerBlockSuccess]: 5 < iStateStep,

          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: false,
            [oClasses.innerBlockNone]: 6 > iStateStep,
            [oClasses.innerBlockOnging]: 6 == iStateStep,
            [oClasses.innerBlockSuccess]: 6 < iStateStep,

          })}>
          </div>
        </div>

      </div>
    </Tooltip >

  );
}
export default Index;
