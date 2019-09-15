import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Admin } from '@/Commons';

import style from './style';

function User(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu >
        <Paper className={classes.paper}>
          <div>
            USER!!!!
          </div>
        </Paper>
      </Admin.Menu >

    </div>
  );
}
export default User;
