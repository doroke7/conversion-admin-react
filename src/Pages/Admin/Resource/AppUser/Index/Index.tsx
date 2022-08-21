import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';

import wrappers from '@/wrappers/index';
import Sdks from '@/Sdks/Index';
import events from '@/events/index';
import Components from '@/Components/Index';
import utilities from '@/utilities/index';

import AppleIcon from './AppleIcon/Index';
import AndroidIcon from './AndroidIcon/Index';
import UnknownIcon from './UnknownIcon/Index';
import Pannel from './Pannel/Index';

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
    { field: 'id', headerName: 'ID', description: '流水号', width: 100, editable: false },
    {
      field: 'avatar',
      headerName: '头像',
      description: '头像',
      sortable: false,
      width: 85,
      renderCell: (oParams: any) => {
        let sPic = oParams.getValue(oParams.id, 'pic') || '';
        return <Components.Admin.Img src={sPic}></Components.Admin.Img>;
      }
    },
    { field: 'username', headerName: '昵称', description: '昵称', width: 160, editable: false },

    {
      field: 'vip_datetime',
      headerName: 'VIP时间',
      description: 'VIP的时间',
      sortable: false,
      width: 200
      // valueGetter: (oParams: any) => `${utilities.dateTime(oParams.getValue(oParams.id, 'addtime') || 0)}`
    },
    {
      field: 'code_number',
      headerName: '手机号',
      description: '手机号',
      sortable: false,
      width: 140
    },
    {
      field: 'phone_type_icon',
      headerName: '设备',
      description: '设备',
      sortable: false,
      width: 90,
      valueGetter: (oParams: any) => {
        let iPhoneType = oParams.getValue(oParams.id, 'phone_type') || 0;
        let sResult = '未知';
        sResult = iPhoneType == 1 ? '安卓' : sResult;
        sResult = iPhoneType == 2 ? 'iOS' : sResult;
        return sResult;
      },
      renderCell: (oParams: any) => {
        let iPhoneType = oParams.getValue(oParams.id, 'phone_type') || 0;
        let Component = UnknownIcon;
        Component = iPhoneType == 1 ? AndroidIcon : Component;
        Component = iPhoneType == 2 ? AppleIcon : Component;

        return <Component></Component>;
      }
    },
    {
      field: 'login_ip',
      headerName: 'IP',
      description: 'IP',
      sortable: false,
      width: 150
      // valueGetter: (oParams: any) => `${utilities.dateTime(oParams.getValue(oParams.id, 'addtime') || 0)}`
    },
    {
      field: 'login_datetime',
      headerName: '登入时间',
      description: '上次登入应用程序的时间',
      sortable: false,
      width: 200
      // valueGetter: (oParams: any) => `${utilities.dateTime(oParams.getValue(oParams.id, 'addtime') || 0)}`
    },
    {
      field: 'add_datetime',
      headerName: '注册时间',
      description: '初始应用程序的时间',
      sortable: false,
      width: 200
      // valueGetter: (oParams: any) => `${utilities.dateTime(oParams.getValue(oParams.id, 'addtime') || 0)}`
    }
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
      cSetState((oOldState) => {
        let oNewState = {
          ...oOldState,
          loading: true,
          rows: []
        };
        return oNewState;
      });
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

  /*
   * NOTE: 一般使用者 习惯从 1 开始标记为第一页
   * NOTE: API 接口服务 1 开始标记为第一页
   * NOTE: <DataGrid>  0 开始标记为第一页
   * NOTE: MYSQL  0 开始标记为第一页

   */

  return (
    <div>
      <div className={oClasses.dataGridWrapper}>
        <DataGrid
          className={oClasses.dataGrid}
          rows={oState.rows}
          columns={aColumns}
          rowCount={oState.count}
          page={0}
          pageSize={oParams.limit}
          checkboxSelection
          disableSelectionOnClick
          hideFooterPagination={true}
          hideFooter={true}
          loading={oState.loading}
          disableColumnMenu={true}
        />
      </div>
      <div className={oClasses.paginationWrapper}>
        {oState.count >= 1 ? (
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default wrappers.admin.tab(wrappers.admin.title(Index));
