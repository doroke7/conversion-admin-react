import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';

import wrappers from '@/wrappers/index';
import Sdks from '@/Sdks/Index';
import events from '@/events/index';

import utilities from '@/utilities/index';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oHistory = useHistory();

  let oParams: any = useParams();
  let oRouteMatch = useRouteMatch();

  let [oState, cSetState] = React.useState<any>({
    number: 0,
    count: 0,
    loading: true,
    rows: []
  });

  let aColumns: any[] = [
    { field: 'id', headerName: 'ID', description: '流水号', width: 100, editable: false }
    // {
    //   field: 'add_datetime',
    //   headerName: '注册时间',
    //   description: '初始应用程序的时间',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (oParams: any) => `${utilities.dateTime(oParams.getValue(oParams.id, 'addtime') || 0)}`
    // }
  ];

  let cHandleChange = (oEvent: React.ChangeEvent<unknown>, iPage: number) => {
    let oNextPageParams = {
      ...oParams,
      page: iPage
    };
    let sUrl = utilities.url(oRouteMatch.path, oNextPageParams);
    oHistory.push(sUrl);
  };

  useEffect(() => {
    (async () => {
      let oOption = {
        app_id: oParams.appId,
        page: oParams.page,
        limit: oParams.limit
      };
      let oResponse = await Sdks.Admin.Resource.AppUser.getShow(oOption);
      cSetState({
        number: oResponse?.data?.raw?.number ?? 0,
        rows: oResponse?.data?.raw?.list ?? [],
        count: Math.ceil((oResponse?.data?.raw?.number ?? 0) / ((oParams.limit ?? 10) || 10)),
        loading: false
      });
      console.info(oResponse);
    })();
  }, [oParams.appId, oParams.page, oParams.limit]);

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={oState.rows}
        columns={aColumns}
        rowCount={oState.count}
        page={1}
        pageSize={oParams.limit}
        checkboxSelection
        disableSelectionOnClick
        loading={oState.loading}
      />
      <div>
        <Pagination
          count={oState.count}
          variant="outlined"
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
          showFirstButton
          showLastButton
          page={Number(oParams.page ?? 1)}
          onChange={cHandleChange}
        />
        {JSON.stringify(oState)}
      </div>
    </div>
  );
}
export default wrappers.admin.tab(wrappers.admin.title(Index));
