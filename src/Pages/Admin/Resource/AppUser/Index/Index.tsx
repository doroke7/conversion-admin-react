import React, { useContext, useState, useEffect, useLayoutEffect, Component } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';

import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import wrappers from '@/wrappers/index';
import Sdks from '@/Sdks/Index';
import events from '@/events/index';
import Components from '@/Components/Index';
import utilities from '@/utilities/index';

import Pannel from './Pannel/Index';
import NoRowsOverlay from './NoRowsOverlay/Index';
import LoadingOverlay from './LoadingOverlay/Index';
import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oHistory = useHistory();

  let oParams: any = useParams();
  let oRouteMatch = useRouteMatch();

  let cSetPageMax = oProps.setPageMax ?? (() => void 0);
  let [oState, cSetState] = useState<any>({
    number: 0,
    count: 0,
    loading: true,
    rows: []
  });

  let aColumns: any[] = [
    { field: 'id', headerName: 'ID', description: '流水号', width: 100, sortable: false, editable: false },
    {
      field: 'avatar',
      headerName: '头像',
      description: '头像',
      sortable: false,
      width: 85,
      renderCell: (oParams: any) => {
        let sVip = oParams.getValue(oParams.id, 'vip') || '';
        let sSrc = oParams.getValue(oParams.id, 'pic') || '';
        let sVipDatetime = oParams.getValue(oParams.id, 'vip_datetime') || '';
        let Icon = Components.Admin.VoidElement;
        Icon = sVip == 1 ? Components.Admin.VipIcon1 : Icon;
        Icon = sVip == 2 ? Components.Admin.VipIcon2 : Icon;
        Icon = sVip == 3 ? Components.Admin.VipIcon3 : Icon;

        let sTitle = '特权一般';
        sTitle = sVip == 1 ? '特权已过期' : sTitle;
        sTitle = sVip == 2 ? '特权直到 ' + sVipDatetime.substring(0, 10) : sTitle;
        sTitle = sVip == 3 ? '特权永久' : sTitle;

        return (
          <Tooltip title={sTitle} placement="right-end">
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              badgeContent={<Icon className={oClasses.vipIcon}></Icon>}>
              <Avatar className={oClasses.avatar}>
                <Components.Admin.Img src={sSrc}></Components.Admin.Img>
              </Avatar>
            </Badge>
          </Tooltip>
        );
      }
    },
    { field: 'username', headerName: '昵称', description: '昵称', width: 160, sortable: false, editable: false },

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
      renderCell: (oParams: any) => {
        let iPhoneType = oParams.getValue(oParams.id, 'phone_type') || 0;
        let Component = Components.Admin.VoidElement;
        Component = iPhoneType == 1 ? Components.Admin.AndroidIcon : Component;
        Component = iPhoneType == 2 ? Components.Admin.AppleIcon : Component;

        return <Component className={oClasses.phoneTypeIcon}></Component>;
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
        size: oParams.size
      };

      let oResponse = await Sdks.Admin.Resource.AppUser.getShow(oOption);
      let iCount = Math.ceil((oResponse?.data?.raw?.number ?? 0) / ((oParams.size ?? 10) || 10)) || 1;
      cSetState({
        number: oResponse?.data?.raw?.number ?? 0,
        rows: oResponse?.data?.raw?.list ?? [],
        count: iCount,
        loading: false
      });
      cSetPageMax(iCount);
    })();
  }, [oParams.appId, oParams.page, oParams.size]);

  /*
   * NOTE: 一般使用者 习惯从 1 开始标记为第一页
   * NOTE: API 接口服务 1 开始标记为第一页
   * NOTE: <DataGrid>  0 开始标记为第一页
   * NOTE: MYSQL  0 开始标记为第一页

   */

  return (
    <div>
      <Pannel></Pannel>
      <div className={oClasses.dataGridWrapper}>
        <DataGrid
          className={oClasses.dataGrid}
          rows={oState.rows}
          columns={aColumns}
          rowCount={oState.rows.length == 0 ? 0 : oState.count}
          page={0}
          pageSize={oParams.size}
          loading={oState.loading}
          checkboxSelection={true}
          disableSelectionOnClick={true}
          hideFooterPagination={true}
          hideFooter={true}
          autoHeight={true}
          disableColumnMenu={true}
          rowHeight={58}
          components={{ NoRowsOverlay: NoRowsOverlay, LoadingOverlay: LoadingOverlay }}
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
export default wrappers.admin.tab(wrappers.admin.page(wrappers.admin.title(Index)));
