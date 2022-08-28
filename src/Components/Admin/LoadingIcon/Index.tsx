import React from 'react';
import clsx from 'clsx';

import cStyle from './style';

function LoadingIcon(oProps: any) {
  let oClasses = cStyle();

  let sClassName = oProps.className ?? '';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx([oClasses.root, sClassName])}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <rect x="15" y="30" width="10" height="40" fill="#0051a2">
        <animate
          attributeName="opacity"
          dur="1.1111111111111112s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          values="1;0.2;1"
          begin="-0.6666666666666666"></animate>
      </rect>
      <rect x="35" y="30" width="10" height="40" fill="#1b75be">
        <animate
          attributeName="opacity"
          dur="1.1111111111111112s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          values="1;0.2;1"
          begin="-0.4444444444444445"></animate>
      </rect>
      <rect x="55" y="30" width="10" height="40" fill="#408ee0">
        <animate
          attributeName="opacity"
          dur="1.1111111111111112s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          values="1;0.2;1"
          begin="-0.22222222222222224"></animate>
      </rect>
      <rect x="75" y="30" width="10" height="40" fill="#89bff8">
        <animate
          attributeName="opacity"
          dur="1.1111111111111112s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          values="1;0.2;1"
          begin="-1.1111111111111112"></animate>
      </rect>
    </svg>
  );
}

export default LoadingIcon;
