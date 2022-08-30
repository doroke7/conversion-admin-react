import React, { useState } from 'react';

import CONFIGS from '@/CONFIGS/INDEX';
import style from './style';

function Img(oProps: any): any {
  let oClasses: any = style(void 0);
  let sSrc = oProps.src ?? '';

  let [oState, cSetState] = useState<any>({
    src: sSrc
  });
  let cHandleError = () => {
    cSetState({ src: CONFIGS.ADMIN.SRC });
  };

  return <img className={oClasses.root} src={oState.src} onError={cHandleError}></img>;
}
export default Img;
