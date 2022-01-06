import React from 'react';

import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';

import Pannel from './Pannel/Index';

import style from './style';

interface State {
  in: boolean;
}

function SignIn(): any {
  const oClasses: any = style(void 0);

  let [oState, cSetState] = React.useState<State>({
    in: true
  });

  let cOnSignInToggle = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let bIn = false;
    cSetState({ ...oState, in: bIn });
  };

  return (
    <Slide in={oState.in} direction="down" timeout={500} mountOnEnter unmountOnExit>
      <div className={oClasses.root}>
        <Grid container spacing={0}>
          <Grid container item xs={false} sm={false} md={2} lg={3} xl={4} spacing={0}>
            {/* <Hidden only={['xs', 'sm']}></Hidden> */}
          </Grid>
          <Grid container item xs={12} sm={12} md={8} lg={6} xl={4} spacing={0}>
            <Pannel onSignInToggle={cOnSignInToggle} />
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
