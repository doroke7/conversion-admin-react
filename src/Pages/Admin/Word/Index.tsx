import React from 'react';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';

import Commons from '@/Commons';
import Components from '@/Components';

import style from './style';

function Word(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Commons.Admin.Menu >
        <Paper className={classes.paper}>
          <Components.Admin.Table />
        </Paper>
      </Commons.Admin.Menu >

    </div>
  );
}
export default Word;
