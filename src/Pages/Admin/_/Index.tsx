import React from 'react';
import Fade from '@material-ui/core/Fade';

import style from './style';

function _(): any {
  let oClasses: any = style(void 0);

  return (
    <Fade in={true} timeout={1000}>
      <div className={oClasses.root}>_</div>
    </Fade>
  );
}
export default _;
