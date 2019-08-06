import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Pannel from './Pannel';

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

function Signin(): any {
  const classes: any = useStyles(void 0);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid container item xs={false} sm={false} md={2} lg={3} xl={4} spacing={0}>
          <Hidden only={['xs', 'sm']}></Hidden>
        </Grid>
        <Grid container item xs={12} sm={12} md={8} lg={6} xl={4} spacing={0}>
          <Pannel />
        </Grid>
        <Grid container item xs={false} sm={false} md={2} lg={3} xl={4} spacing={0}>
          <Hidden only={['xs', 'sm']}></Hidden>
        </Grid>
      </Grid>
    </div>
  );
}
export default Signin;
