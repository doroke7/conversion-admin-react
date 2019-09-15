import React from 'react';
import Paper from '@material-ui/core/Paper';
import Commons from '@/Commons';

import style from './style';

function Administrator(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Commons.Admin.Menu >
        <Paper className={classes.paper}>
          <div>
            Administrator!!!!
          </div>
        </Paper>
      </Commons.Admin.Menu >

    </div>
  );
}
export default Administrator;
