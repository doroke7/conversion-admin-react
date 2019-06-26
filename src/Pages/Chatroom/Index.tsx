import React from 'react';
import './Index.scss';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Rooms from './Rooms/Index';
import Channel from './Channel/Index';

function NestedGrid() {

  return (
    <Grid container justify="center" className="chatroom">
      <Grid item xs={false} sm={4} md={4} lg={3} xl={3}>
        <Hidden only="xs">
          <Rooms/>
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={9} xl={9}>
        <Channel/>
      </Grid>
    </Grid>
  );
}

export default NestedGrid;
