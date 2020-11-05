import React from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';
import Commons from '@/Commons';

import style from './style';

import actions from '@/actions/';

function Do(): any {
  const classes: any = style(void 0);
  let dispatch = useDispatch();

  let cShow = async () => {
    await dispatch(actions.admin.resource.domain.show());
  };

  cShow();

  return (
    <div className={classes.root}>
      <Commons.Admin.Menu>
        <Paper className={classes.paper}>
          <div>DOMAIN</div>
        </Paper>
      </Commons.Admin.Menu>
    </div>
  );
}
export default Do;
