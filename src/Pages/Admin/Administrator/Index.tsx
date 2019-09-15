import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Admin } from '@/Commons';

import style from './style';

function Administrator(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu >
        <Paper className={classes.paper}>
          <div>
            Administrator!!!!
          </div>
        </Paper>
      </Admin.Menu >

    </div>
  );
}
export default Administrator;
