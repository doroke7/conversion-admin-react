import React, { useContext, useState, useEffect, useLayoutEffect, Component } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';

import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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
    rows: [],
    size: 10,
    page: ''
  });

  let dSizesToHeight = {
    '10': 59.448,
    '20': 29.724,
    '50': 29.724,
    '100': 29.724
  };

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
        let Icon = Components.VoidElement;
        Icon = sVip == 1 ? Components.VipIcon1 : Icon;
        Icon = sVip == 2 ? Components.VipIcon2 : Icon;
        Icon = sVip == 3 ? Components.VipIcon3 : Icon;

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
                <Components.Img src={sSrc}></Components.Img>
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
        let Component = () => <Components.VoidElement className={oClasses.phoneTypeIcon} />;
        Component = iPhoneType == 1 ? () => <Components.AndroidIcon className={oClasses.phoneTypeIcon} /> : Component;

        Component = iPhoneType == 2 ? () => <Components.AppleIcon className={oClasses.phoneTypeIcon} /> : Component;
        let sTitle = '';
        sTitle = iPhoneType == 1 ? '安卓设备' : sTitle;
        sTitle = iPhoneType == 2 ? '苹果设备' : sTitle;

        return iPhoneType == 1 || iPhoneType == 2 ? (
          <Tooltip title={sTitle} placement="right-end">
            <div>
              <Component></Component>
            </div>
          </Tooltip>
        ) : (
          <div>
            <Component></Component>
          </div>
        );
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
        loading: false,
        size: oParams.size
      });
      cSetPageMax(iCount);
    })();
  }, [oParams.appId, oParams.page, oParams.size]);

  let cHandleChangeSize = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let iSize = Number(oEvent.target.value);
    // cSetState({ ...oState, size: iSize });
    cSetState({ ...oState, size: iSize, loading: true, rows: [] });

    let oSizeParams = {
      ...oParams,
      size: iSize
    };
    let sUrl = utilities.url(oRouteMatch.path, oSizeParams);
    oHistory.push(sUrl);
  };

  useEffect(() => {
    cSetState({ ...oState, size: oParams.size, loading: true });
  }, [oParams.size]);

  let cHandleChangePage = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sPage = oEvent.target.value;
    cSetState({ ...oState, page: sPage });
  };
  let cHandleKeyPressPage = (oEvent: any) => {
    if (oEvent.charCode == 13) {
      let iPage = Number(oState.page);
      if (!Number.isInteger(iPage)) {
        let oMessage = {
          code: -1,
          message: '请输入数字页数',
          time: 3 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      }
      if (Number.isInteger(iPage)) {
        let oPageParams = {
          ...oParams,
          page: iPage
        };
        let sUrl = utilities.url(oRouteMatch.path, oPageParams);
        oHistory.push(sUrl);
      }
    }
  };
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
          hideFooterPagination={false}
          hideFooter={false}
          autoHeight={false}
          disableColumnMenu={true}
          rowHeight={dSizesToHeight[oState.size] ?? dSizesToHeight[10]}
          components={{
            NoRowsOverlay: NoRowsOverlay,
            LoadingOverlay: LoadingOverlay,
            Pagination: (oProps: any) => (
              <div className={oClasses.paginationWrapper}>
                <Pagination
                  className={oClasses.pagination}
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
                <FormControl className={oClasses.formControl}>
                  <Select labelId="demo-simple-select-label" id="size" value={oState.size} onChange={cHandleChangeSize}>
                    <MenuItem value={10}>10条/页</MenuItem>
                    <MenuItem value={20}>20条/页</MenuItem>
                    <MenuItem value={50}>50条/页</MenuItem>
                    <MenuItem value={100}>100条/页</MenuItem>
                  </Select>
                </FormControl>
                <span className={oClasses.page}>
                  <span className="pre">跳转到第&ensp;</span>
                  <TextField
                    id="page"
                    value={oState.page} // oState.page 改成局部 component state.page
                    onChange={cHandleChangePage}
                    // onKeyPress={cHandleKeyPressPage}
                  />
                  <span className="next">&ensp;页</span>
                </span>
              </div>
            )
          }}
        />
      </div>
    </div>
  );
}
export default wrappers.admin.tab(wrappers.admin.page(wrappers.admin.title(Index)));
