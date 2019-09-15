import React from 'react';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';

import { Admin } from '@/Commons';

import style from './style';


function Word(): any {
  const classes: any = style(void 0);

  return (
    <div className={classes.root}>
      <Admin.Menu >
        <Paper className={classes.paper}>
        </Paper>
      </Admin.Menu >

    </div>
  );
}
export default Word;
