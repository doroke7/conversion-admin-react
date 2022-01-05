import React from 'react';

import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';

import Pannel from './Pannel/Index';

import style from './style';

function SignIn(): any {
  const oClasses: any = style(void 0);

  return (
    <Slide in={true} direction="down" timeout={500} mountOnEnter unmountOnExit>
      <div className={oClasses.root}>
        <Grid container spacing={0}>
          <Grid container item xs={false} sm={false} md={2} lg={3} xl={4} spacing={0}>
            {/* <Hidden only={['xs', 'sm']}></Hidden> */}
          </Grid>
          <Grid container item xs={12} sm={12} md={8} lg={6} xl={4} spacing={0}>
            <Pannel />
          </Grid>
          <Grid container item xs={false} sm={false} md={2} lg={3} xl={4} spacing={0}>
            {/* <Hidden only={['xs', 'sm']}></Hidden> */}
          </Grid>
        </Grid>
      </div>
    </Slide>
  );
}
export default SignIn;
