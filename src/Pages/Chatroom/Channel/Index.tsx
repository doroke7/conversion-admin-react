import React, { useState } from 'react';
import './Index.scss';

import ControlPannel from './ControlPannel/Index';
import Top from './Top/Index';
import Detail from './Detail/Index';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';


// import Message from './Message/Index';


const Channel: React.FC = () => {
  const [state, setState] = React.useState({
    drawer: false
  });

  const toggleDrawer = (isOpened: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({
      drawer: isOpened
    });
  };


  return (
    <div className="channel">
      <Top/>
      <div onClick={toggleDrawer(true)}>TOP2</div>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <ControlPannel/>
        </Grid>
        <Grid item xs={false} sm={false} md={4} lg={4} xl={4}>
          <Hidden only={["xs", "sm"]}>
            <Detail />
          </Hidden>
        </Grid>
      </Grid>
      <Drawer anchor="right" open={state.drawer} onClose={toggleDrawer(false)}>
        DRAWER...
      </Drawer>
    </div>

  );
}

export default Channel;
