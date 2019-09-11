import React from 'react';
import { Admin } from '@/Commons';

import style from './style';

function Word(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu >
        <div>
          WORD!!!!
        </div>
      </Admin.Menu >

    </div>
  );
}
export default Word;
