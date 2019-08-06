import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

function NestedGrid(): any {
  const classes: any = useStyles(void 0);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          A
        </Grid>
        <Grid container item xs={12} spacing={3}>
          B
        </Grid>
        <Grid container item xs={12} spacing={3}>
          C
        </Grid>
      </Grid>
    </div>
  );
}
export default NestedGrid;
