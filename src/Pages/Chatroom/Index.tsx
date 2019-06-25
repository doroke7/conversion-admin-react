import React from 'react';
import './Index.scss';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';
import Detail from './Detail/Index';

function NestedGrid() {

  return (
    <Grid container justify="center" className="chatroom">
      <Grid item xs={3}>
        <Rooms/>
      </Grid>
      <Grid item xs={7}>
        <Channel/>
      </Grid>
      <Grid item xs={2}>
        <Detail/>
      </Grid>
    </Grid>
  );
}

export default NestedGrid;
