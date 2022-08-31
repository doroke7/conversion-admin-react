import React from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Grid from '@material-ui/core/Grid';
import Helpers from '@/admin/Helpers/Index';
import Components from '@/admin/Components/Index';
import Sdks from '@/admin/Sdks/Index';
import wrappers from '@/admin/wrappers';

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
          <Grid item xs={'auto'} sm={1} md={2} lg={3} xl={4} spacing={0}></Grid>
          <Grid item xs={12} sm={10} md={8} lg={6} xl={4} spacing={0}>
            <Pannel />
          </Grid>
          <Grid item xs={'auto'} sm={1} md={2} lg={3} xl={4} spacing={0}></Grid>
        </Grid>
      </div>
    </div>
  );
}
export default wrappers.authenticator(wrappers.title(SignIn));

/**
 * 

NOTE： 这种 宽度设计是为了去除 子元素间距， 最左区块左边的间距 最右区块右边的间距
.MuiGrid-spacing-xs-4 {
    width: calc(100% + 32px);
    margin: -16px;
}
**/
