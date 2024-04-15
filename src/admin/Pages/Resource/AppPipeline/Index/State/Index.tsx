import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import clsx from 'clsx';

import style from './style';

function Index(oProps: any): any {
  let iValue = oProps.value ?? 0;
  let oClasses: any = style(void 0);

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


  return (
    <Tooltip title={sState} placement="right">
      <div className={oClasses.root}>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iValue >= 1 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iValue >= 2 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iValue >= 3 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iValue >= 4 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iValue >= 5 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iValue >= 6 })}></div>
        <div className={clsx(oClasses.step, { [oClasses.stepDisable]: true, [oClasses.stepEnable]: iValue >= 7 })}></div>

      </div>
    </Tooltip>

  );
}
export default Index;
