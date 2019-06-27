import React from 'react';
import './Index.scss';

import ControlPannel from './ControlPannel/Index';
import Top from './Top/Index';
import Detail from './Detail/Index';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';


// import Message from './Message/Index';


const Channel: React.FC = () => {
  return (
    <div className="channel">
      <Top/>
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
    </div>

  );
}

export default Channel;
