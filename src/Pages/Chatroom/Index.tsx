import React from 'react';
import './Index.scss';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';
import Information from './Information/Index';

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);



function NestedGrid() {
  const classes = useStyles();

  return (
    <Grid container justify="center" className="chatroom">
      <Grid item xs={3}>
        <Rooms/>
      </Grid>
      <Grid item xs={7}>
        <Channel/>
      </Grid>
      <Grid item xs={2}>
        <Information/>
      </Grid>
    </Grid>
  );
}

export default NestedGrid;
