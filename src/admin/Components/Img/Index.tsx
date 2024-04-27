import React, { useState } from 'react';

import CONFIGS from '@/CONFIGS/INDEX';
import style from './style';

function Img(oProps: any): any {
  let oClasses: any = style(void 0);
  let sSrc = oProps.src ?? '';

  let [sStateSrc, cSetStateSrc] = useState<string>(sSrc);

  let cHandleError = () => {
    cSetStateSrc(CONFIGS.ADMIN.SRC);
  };

  return <img className={oClasses.root} src={sStateSrc} onError={cHandleError}></img>;
}
export default Img;
