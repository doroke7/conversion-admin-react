import React, { useContext, useState, useEffect, useLayoutEffect, Component } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import wrappers from '@/admin/wrappers/index';
import Sdks from '@/admin/Sdks/Index';
import events from '@/admin/events/index';
import Components from '@/admin/Components/Index';
import utilities from '@/admin/utilities/index';

import Inputs from './Inputs/Index';
import SearchPannel from './SearchPannel/Index';
import AvatarForCell from './AvatarForCell/Index';
import PhoneTypeIconForCell from './PhoneTypeIconForCell/Index';
import CardForAppUser from './CardForAppUser/Index';

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
    page: '',
    searchDialog: false,
    pageDialog: false
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
      renderCell: (oParams: any) => <AvatarForCell {...oParams}></AvatarForCell>
    },
    { field: 'username', headerName: '昵称', description: '昵称', width: 160, sortable: false, editable: false },

    {
      field: 'vip_datetime',
      headerName: 'VIP时间',
      description: 'VIP的时间',
      sortable: false,
      width: 200
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
      renderCell: (oParams: any) => <PhoneTypeIconForCell {...oParams}></PhoneTypeIconForCell>
    },
    {
      field: 'login_ip',
      headerName: 'IP',
      description: 'IP',
      sortable: false,
      width: 150
    },
    {
      field: 'login_datetime',
      headerName: '登入时间',
      description: '上次登入应用程序的时间',
      sortable: false,
      width: 200
    },
    {
      field: 'add_datetime',
      headerName: '注册时间',
      description: '初始应用程序的时间',
      sortable: false,
      width: 200
    }
  ];

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

  useEffect(() => {
    cSetState({ ...oState, size: oParams.size, loading: true });
  }, [oParams.size]);

  let cHandleChange = (oEvent: React.ChangeEvent<unknown>, iPage: number) => {
    let oNextPageParams = {
      ...oParams,
      page: iPage
    };
    let sUrl = utilities.url(oRouteMatch.path, oNextPageParams);
    oHistory.push(sUrl);
  };

  let cHandleChangeSize = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let iSize = Number(oEvent.target.value);

    let oSizeParams = {
      ...oParams,
      size: iSize
    };
    let sUrl = utilities.url(oRouteMatch.path, oSizeParams);
    oHistory.push(sUrl);
  };

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
          message: '请输入 "整数" 页数',
          time: 3 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      }
      if (Number.isInteger(iPage) && oParams?.page != iPage) {
        let oPageParams = {
          ...oParams,
          page: iPage
        };
        let oMessage = {
          code: 1,
          message: '即将跳转到第' + iPage + '页',
          time: 3 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);

        let sUrl = utilities.url(oRouteMatch.path, oPageParams);
        oHistory.push(sUrl);
      }
    }
  };

  let cHandleBlurPage = (oEvent: any) => {
    let iPage = Number(oState.page);
    if (!Number.isInteger(iPage)) {
      let oMessage = {
        code: -1,
        message: '请输入 "整数" 页数',
        time: 3 * 1000
      };
      events.emit('Alerts-onAlert', oMessage);
    }
    if (Number.isInteger(iPage) && oParams?.page != iPage) {
      let oPageParams = {
        ...oParams,
        page: iPage
      };
      let oMessage = {
        code: 1,
        message: '即将跳转到第' + iPage + '页',
        time: 3 * 1000
      };
      events.emit('Alerts-onAlert', oMessage);
      let sUrl = utilities.url(oRouteMatch.path, oPageParams);
      oHistory.push(sUrl);
    }
  };

  let cHandleSearchClick = (oEvent: any) => {
    cSetState((oOldState) => ({ ...oOldState, searchDialog: true }));
  };

  let cHandleSearchCancleClick = (oEvent: any) => {
    cSetState((oOldState) => ({ ...oOldState, searchDialog: false }));
  };

  let cHandlePageClick = (oEvent: any) => {
    cSetState((oOldState) => ({ ...oOldState, pageDialog: true }));
  };

  let cHandlePageCancleClick = (oEvent: any) => {
    cSetState((oOldState) => ({ ...oOldState, pageDialog: false }));
  };
  /*
   * NOTE: 一般使用者 习惯从 1 开始标记为第一页
   * NOTE: API 接口服务 1 开始标记为第一页
   * NOTE: <DataGrid>  0 开始标记为第一页
   * NOTE: MYSQL  0 开始标记为第一页

   */

  return (
    <div className="app-user">
      <Dialog
        className={oClasses.dialogForSearch}
        open={oState.searchDialog}
        onClose={cHandleSearchCancleClick}
        aria-labelledby="form-dialog-search">
        <DialogTitle id="form-dialog-search">
          搜索用戶列表
          <IconButton aria-label="close" className={oClasses.closeButton} onClick={cHandleSearchCancleClick}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Inputs></Inputs>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            className={oClasses.submitButton}
            variant="outlined"
            endIcon={<SearchIcon></SearchIcon>}>
            筛选
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        className={oClasses.dialogForPage}
        open={oState.pageDialog}
        onClose={cHandlePageCancleClick}
        aria-labelledby="form-dialog-page">
        <DialogTitle id="form-dialog-page">
          切換頁數
          <IconButton aria-label="close" className={oClasses.closeButton} onClick={cHandlePageCancleClick}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            className={''}
            id="page"
            label="頁數"
            placeholder="请输入數字"
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={oParams.page}
            type="number"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" className={oClasses.submitButton} variant="outlined">
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <SearchPannel>
        <Inputs></Inputs>
        <Button
          color="primary"
          className={oClasses.submitButton}
          variant="outlined"
          endIcon={<SearchIcon></SearchIcon>}>
          筛选
        </Button>
      </SearchPannel>
      <div className={oClasses.dataGridWrapper}>
        <DataGrid
          className={clsx(oClasses.dataGrid, {})}
          rows={oState.rows}
          columns={aColumns}
          rowCount={oState.rows.length == 0 ? 0 : oState.count}
          page={0}
          pageSize={oParams.size}
          loading={oState.loading}
          checkboxSelection={true}
          disableSelectionOnClick={true}
          hideFooterPagination={true}
          scrollbarSize={0}
          hideFooter={true}
          autoHeight={true}
          autoPageSize={false}
          disableColumnMenu={true}
          rowHeight={dSizesToHeight[oState.size] ?? dSizesToHeight[10]}
          components={{
            NoRowsOverlay: Components.NoRowsOverlay,
            LoadingOverlay: Components.LoadingOverlay
          }}
        />
      </div>
      <Components.Cards rows={oState.rows} loading={oState.loading} Card={CardForAppUser}></Components.Cards>
      <div className={oClasses.paginationWrapper}>
        <IconButton color="primary" aria-label="筛选" className={oClasses.searchButton} onClick={cHandleSearchClick}>
          <SearchIcon></SearchIcon>
        </IconButton>

        <Pagination
          className={oClasses.pagination}
          count={oState.count}
          variant="outlined"
          shape="round"
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
          <span className="pre">到第&ensp;</span>
          <TextField
            id="page"
            value={oState.page}
            onChange={cHandleChangePage}
            onKeyPress={cHandleKeyPressPage}
            onBlur={cHandleBlurPage}
          />
          <span className="next">&ensp;页</span>
        </span>
        <IconButton color="primary" aria-label="页数" className={oClasses.pageButton} onClick={cHandlePageClick}>
          <MenuBookTwoToneIcon></MenuBookTwoToneIcon>
        </IconButton>
      </div>
    </div>
  );
}
export default wrappers.authenticator(wrappers.tab(wrappers.page(wrappers.title(Index))));
