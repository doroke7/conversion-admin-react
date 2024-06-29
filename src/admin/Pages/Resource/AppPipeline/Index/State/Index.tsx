import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import clsx from 'clsx';
import style from './style';

function Index(oProps: any): any {
  let iState = oProps?.state ?? 0;
  let iStatus = oProps?.status ?? 0;
  let iId = oProps?.id ?? 0;
  let oClasses: any = style(void 0);

  let [iStateStep, cSetStateStep] = useState<number>(0);

  let oStates = {
    0: '任務启动',
    1: '資源同步',
    2: '資源转码',
    3: '資源加密',
    4: '資源上云',
    5: '資源回调',
    6: '資源预热',
    254: '任務完成',
  };

  let oStatuses = {
    '-1': '已失败',
    '0': '即开始',
    '1': '进行中',
    '2': '已成功',
  };

  let sState = oStates[iState ?? 0] ?? '';
  let sStatus = oStatuses[iStatus ?? 0] ?? '';

  const iNoneStatus = 0;
  const iOngoingStatus = 1;
  const iSuccessStatus = 2;
  const iFailStatus = -1;


  useEffect(() => {
    cSetStateStep(iState);

  }, [iStateStep, iState]);

  return (
    <Tooltip title={sState + '-' + sStatus} placement="top" arrow={true}>
      <div className={oClasses.root}>
        <div className={oClasses.wrapperProcess}>
          <div className={clsx(oClasses.process, oClasses.processAnimation01, {
            [oClasses.processFail]: 1 == iStateStep && iFailStatus == iStatus,
            [oClasses.processNone]: 1 > iStateStep || (1 == iStateStep && iNoneStatus == iStatus),
            [oClasses.processOnging]: 1 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.processSuccess]: 1 < iStateStep || (1 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

        <div className={oClasses.wrapperProcess}>
          <div className={clsx(oClasses.process, oClasses.processAnimation02, {
            [oClasses.processFail]: 2 == iStateStep && iFailStatus == iStatus,
            [oClasses.processNone]: 2 > iStateStep || (2 == iStateStep && iNoneStatus == iStatus),
            [oClasses.processOnging]: 2 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.processSuccess]: 2 < iStateStep || (2 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

        <div className={oClasses.wrapperProcess}>
          <div className={clsx(oClasses.process, oClasses.processAnimation03, {
            [oClasses.processFail]: 3 == iStateStep && iFailStatus == iStatus,
            [oClasses.processNone]: 3 > iStateStep || (3 == iStateStep && iNoneStatus == iStatus),
            [oClasses.processOnging]: 3 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.processSuccess]: 3 < iStateStep || (3 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

        <div className={oClasses.wrapperProcess}>
          <div className={clsx(oClasses.process, oClasses.processAnimation04, {
            [oClasses.processFail]: 4 == iStateStep && iFailStatus == iStatus,
            [oClasses.processNone]: 4 > iStateStep || (4 == iStateStep && iNoneStatus == iStatus),
            [oClasses.processOnging]: 4 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.processSuccess]: 4 < iStateStep || (4 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

        <div className={oClasses.wrapperProcess}>
          <div className={clsx(oClasses.process, oClasses.processAnimation05, {
            [oClasses.processFail]: 5 == iStateStep && iFailStatus == iStatus,
            [oClasses.processNone]: 5 > iStateStep || (5 == iStateStep && iNoneStatus == iStatus),
            [oClasses.processOnging]: 5 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.processSuccess]: 5 < iStateStep || (5 == iStateStep && iSuccessStatus == iStatus),
          })}>
          </div>
        </div>

        <div className={oClasses.wrapperProcess}>
          <div className={clsx(oClasses.process, oClasses.processAnimation06, {
            [oClasses.processFail]: 6 == iStateStep && iFailStatus == iStatus,
            [oClasses.processNone]: 6 > iStateStep || (6 == iStateStep && iNoneStatus == iStatus),
            [oClasses.processOnging]: 6 == iStateStep && iOngoingStatus == iStatus,
            [oClasses.processSuccess]: 6 < iStateStep || (6 == iStateStep && iSuccessStatus == iStatus),

          })}>
          </div>
        </div>

      </div>
    </Tooltip >

  );
}
export default Index;
