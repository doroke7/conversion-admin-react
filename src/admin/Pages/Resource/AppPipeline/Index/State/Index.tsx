import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import clsx from 'clsx';

import style from './style';
import { setTimeout } from 'timers';

function Index(oProps: any): any {
  let iState = oProps?.state ?? 0;
  let iStatus = oProps?.status ?? 0;
  let iId = oProps?.id ?? 0;
  let oClasses: any = style(void 0);

  let [iStateStep, cSetStateStep] = useState<number>(0);

  let oStates = {
    0: '任務启动',
    1: '資源下载',
    2: '資源转码',
    3: '資源加密',
    4: '資源上传',
    5: '資源回调',
    6: '資源预热',
    254: '任務完成',
  };

  let oStatuses = {
    '-1': '失败',
    '0': '开始',
    '1': '进行',
    '2': '成功',
  };

  let sState = oStates[iState ?? 0] ?? '';
  let sStatus = oStatuses[iStatus ?? 0] ?? '';

  const iNoneStatus = 0;
  const iOngoingStatus = 1;
  const iSuccessStatus = 2;
  const iFailStatus = -1;


  useEffect(() => {
    (async () => {

      await new Promise((cResolve, cReject) => { setTimeout(() => { cResolve(true); }, 50) });
      cSetStateStep((iPreStateStep) => {
        let iNextStateValue = iPreStateStep >= iState ? iState : iPreStateStep + 1;
        return iNextStateValue;
      });
    })();








    

  }, [iStateStep, iState]);

  return (
    <Tooltip title={sState + '-' + sStatus} placement="top">
      <div className={oClasses.root}>
        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: 1 == iStateStep && iFailStatus == iStatus,
            [oClasses.innerBlockNone]: 1 > iStateStep || (1 == iStateStep && iNoneStatus == iStatus),
            [oClasses.innerBlockOnging]: 1 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.innerBlockSuccess]: 1 < iStateStep || (1 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: 2 == iStateStep && iFailStatus == iStatus,
            [oClasses.innerBlockNone]: 2 > iStateStep || (2 == iStateStep && iNoneStatus == iStatus),
            [oClasses.innerBlockOnging]: 2 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.innerBlockSuccess]: 2 < iStateStep || (2 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: 3 == iStateStep && iFailStatus == iStatus,
            [oClasses.innerBlockNone]: 3 > iStateStep || (3 == iStateStep && iNoneStatus == iStatus),
            [oClasses.innerBlockOnging]: 3 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.innerBlockSuccess]: 3 < iStateStep || (3 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: 4 == iStateStep && iFailStatus == iStatus,
            [oClasses.innerBlockNone]: 4 > iStateStep || (4 == iStateStep && iNoneStatus == iStatus),
            [oClasses.innerBlockOnging]: 4 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.innerBlockSuccess]: 4 < iStateStep || (4 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: 5 == iStateStep && iFailStatus == iStatus,
            [oClasses.innerBlockNone]: 5 > iStateStep || (5 == iStateStep && iNoneStatus == iStatus),
            [oClasses.innerBlockOnging]: 5 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.innerBlockSuccess]: 5 < iStateStep || (5 == iStateStep && iSuccessStatus == iStatus),
          })}>
          </div>
        </div>

        <div className={oClasses.outerBlock}>
          <div className={clsx(oClasses.innerBlock, {
            [oClasses.innerBlockFail]: 6 == iStateStep && iFailStatus == iStatus,
            [oClasses.innerBlockNone]: 6 > iStateStep || (6 == iStateStep && iNoneStatus == iStatus),
            [oClasses.innerBlockOnging]: 6 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.innerBlockSuccess]: 6 < iStateStep || (6 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

      </div>
    </Tooltip >

  );
}
export default Index;
