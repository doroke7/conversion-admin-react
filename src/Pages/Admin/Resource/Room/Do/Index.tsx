import React from 'react';
import Paper from '@material-ui/core/Paper';
import Commons from '@/Commons';

import style from './style';

function Do(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Commons.Admin.Navigation>
        <Paper className={classes.paper}>
          <div>ROOM</div>
        </Paper>
      </Commons.Admin.Navigation>
    </div>
  );
}
export default Do;
