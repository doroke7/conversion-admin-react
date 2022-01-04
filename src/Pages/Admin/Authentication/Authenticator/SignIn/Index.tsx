import React from 'react';

import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

import Pannel from './Pannel/Index';

import style from './style';

function SignIn(): any {
  const oClasses: any = style(void 0);

  return (
    <Grow in={true} style={{ transformOrigin: 'top center 0' }} timeout={1000}>
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
    </Grow>
  );
}
export default SignIn;
