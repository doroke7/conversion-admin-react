import React from 'react';
import Paper from '@material-ui/core/Paper';
import Commons from '@/Commons';

import style from './style';

function Room(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Commons.Admin.Menu >
        <Paper className={classes.paper}>
          <div>
            ROOM
          </div>
        </Paper>

      </Commons.Admin.Menu >

    </div>
  );
}
export default Room;
