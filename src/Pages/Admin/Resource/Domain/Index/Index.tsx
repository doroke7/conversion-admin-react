import React, { useState, useEffect, useContext } from 'react';
import { useMappedState, useDispatch, StoreContext } from 'redux-react-hook';

import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Commons from '@/Commons';

import style from './style';

import actions from '@/actions/';

interface State {
  loading: boolean;
}

function Index(): any {
  const classes: any = style(void 0);
  let dispatch = useDispatch();

  let [oState, setState] = useState<State>({
    loading: true
  });

  let cShow = async () => {
    await dispatch(actions.admin.resource.domain.show());
    let _oState = {
      loading: false
    };
    await setState(_oState);
  };

  let store = useContext(StoreContext);

  let oStoreState = store.getState();
  /*
  当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，
  并使用最新传递给 MyContext provider 的 context value 值。
  即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。
  
  */

  let iPageSize: number = 10;

  // useEffect(() => {
  //   cShow();
  // });

  useEffect(() => {
    cShow();
  }, []); // only run once

  // const oStore = useContext(StoreContext);

  const columns = [
    { field: 'domain_id', headerName: 'ID', width: 70 },
    { field: 'server', headerName: '域名', width: 300 },
    { field: 'path', headerName: '资源', width: 150 },
    { field: 'weight', headerName: '权重', width: 100 },
    { field: 'status', headerName: '状态', width: 100 }
  ];

  return (
    <div className={classes.root}>
      <Commons.Admin.Navigation>
        <Paper className={classes.paper}>
          <div className={classes.dataGridWrapper}>
            <DataGrid
              rows={oStoreState.domain}
              loading={oState.loading}
              columns={columns}
              autoPageSize={false}
              pageSize={iPageSize}
              rowHeight={44}
              headerHeight={48}
            />
          </div>
        </Paper>
      </Commons.Admin.Navigation>
    </div>
  );
}
export default Index;
