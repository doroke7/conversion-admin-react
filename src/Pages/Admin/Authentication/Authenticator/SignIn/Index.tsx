import React from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Grid from '@material-ui/core/Grid';
import Helpers from '@/Helpers/Index';
import Components from '@/Components/Index';
import Sdks from '@/Sdks/Index';
import wrappers from '@/wrappers';

import Pannel from './Pannel/Index';

import style from './style';

interface State {
  open: boolean;
}

function SignIn(): any {
  let oClasses: any = style(void 0);
  let oDispatch = useDispatch();

  let [oState, cSetState] = React.useState<State>({ open: true });

  let cHandleClick = () => {
    cSetState({ ...oState, open: true });
  };

  let cHandleClose = (event: React.SyntheticEvent | React.MouseEvent, sReason?: string) => {
    if (sReason === 'clickaway') {
      return;
    }

    cSetState({ ...oState, open: false });
  };

  return (
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
  );
}
export default wrappers.authenticator(wrappers.title(SignIn));
