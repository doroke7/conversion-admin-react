import React from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Helpers from '@/Helpers/';
import actions from '@/actions/';

import Pannel from './Pannel/Index';

import style from './style';

interface State {}

function SignIn(): any {
  let oClasses: any = style(void 0);
  let oDispatch = useDispatch();

  let [oState, cSetState] = React.useState<State>({});

  let cRefresh = async () => {
    let sJwt = Helpers.Authentication.getJwt();
    let oBody = {};
    let oOption = {};
    let oQuery = {};
    if (sJwt) {
      let oPlayLoad = await oDispatch(actions.admin.authentication.authenticator.refresh(oBody, oOption, oQuery));
      let b = oPlayLoad;
    }
  };

  cRefresh();

  return (
    <Slide in={true} direction="down" timeout={500} mountOnEnter unmountOnExit>
      <div className={oClasses.root}>
        <div className={oClasses.middle}>
          <Grid container spacing={0}>
            <Grid container item xs={false} sm={false} md={2} lg={3} xl={4} spacing={0}></Grid>
            <Grid container item xs={12} sm={12} md={8} lg={6} xl={4} spacing={0}>
              <Pannel />
            </Grid>
            <Grid container item xs={false} sm={false} md={2} lg={3} xl={4} spacing={0}></Grid>
          </Grid>
        </div>
      </div>
    </Slide>
  );
}
export default SignIn;
