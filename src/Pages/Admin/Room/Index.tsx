import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Admin } from '@/Commons';

import style from './style';

function Room(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu >
        <Paper className={classes.paper}>
          <div>
            ROOM
          </div>
        </Paper>

      </Admin.Menu >

    </div>
  );
}
export default Room;
