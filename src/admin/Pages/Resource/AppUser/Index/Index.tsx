import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
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

import Hocs from '@/admin/Hocs';
import Sdks from '@/admin/Sdks/Index';
import events from '@/admin/events/index';
import Components from '@/admin/Components/Index';
import utilities from '@/admin/utilities/index';

import Inputs from './Inputs/Index';
import SearchPannel from './SearchPannel/Index';
import AvatarForCell from './AvatarForCell/Index';
import PhoneTypeIconForCell from './PhoneTypeIconForCell/Index';
import CardForAppUser from './CardForAppUser/Index';

import hooks from '@/admin/hooks';
import style from './style';

function Index(oProps: any): any {
  let cSetPageMax = oProps.setPageMax ?? (() => void 0);

  let oClasses: any = style(void 0);
  let oHistory = useHistory();

  let oParams: any = useParams();
  let oRouteMatch = useRouteMatch();
  let oUrlSearchParams = hooks.useURLSearchParams();

  let [iStateNumer, cSetStateNumer] = useState<number>(0);
  let [iStateCount, cSetStateCount] = useState<number>(0);
  let [bStateLoading, cSetStateLoading] = useState<boolean>(false);
  let [aStateRows, cSetStateRows] = useState<any[]>([]);
  let [iStateLimit, cSetStateLimit] = useState<number>(10);
  let [sStatePage, cSetStatePage] = useState<string>('');
  let [bStateSearchDialog, cSetStateSearchDialog] = useState<boolean>(false);
  let [bStatePageDialog, cSetStatePageDialog] = useState<boolean>(false);


  let iLimit = Number(oUrlSearchParams.get('limit'));

  let oLimitToHeight = {
    '10': 59.448,
    '20': 29.724,
    '50': 29.724,
    '100': 29.724
  };

  let aColumns: any[] = [
    {
      field: 'id',
      headerName: 'ID',
      description: '流水号',
      width: 100,
      sortable: false,
      editable: false
    },
    {
      field: 'name',
      headerName: '名称',
      description: '名称',
      sortable: false,
      flex: 2,
      width: 85,
    },

    {
      field: 'app_url',
      headerName: '项目',
      description: '项目',
      sortable: false,
      flex: 1,
      width: 200
    },
    {
      field: 'sort',
      headerName: '优先级',
      description: '优先级',
      width: 120,
      sortable: false,
      editable: false
    },
    {
      field: 'added_time',
      headerName: '创建时间',
      description: '创建时间',
      sortable: false,
      flex: 1,
      width: 200
    },
    {
      field: 'tool',
      headerName: '操作',
      description: '操作',
      sortable: false,
      flex: 1,
      width: 200
    },
  ];

  useEffect(() => {
    (async () => {

      cSetStateLoading(true);
      cSetStateRows([]);

      let oOption = {
        appId: oParams.appId,
        page: oParams.page,
        limit: iLimit ?? 10
      };

      let oResponse = await Sdks.Admin.Resource.AppUser.getShowOnes(oOption);

      console.log('oResponse', oResponse);
      let iNumber = Number(oResponse?.data?.raw?.number ?? 0);
      let iCount = Math.ceil((oResponse?.data?.raw?.number ?? 0) / ((oParams.size ?? 10) || 10)) || 1;
      let aRows = oResponse?.data?.raw?.ones ?? [];

      cSetStateNumer(iNumber);
      cSetStateRows(aRows);
      cSetStateCount(iCount);
      cSetStateLoading(false);
      cSetStateLimit(iLimit);

      cSetPageMax(iCount);

    })();
  }, [oParams.appId, oParams.page, oParams.size]);

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

    let oOtherParams = {
      ...oParams,
      size: iSize
    };
    let sUrl = utilities.url(oRouteMatch.path, oOtherParams);
    oHistory.push(sUrl);
  };

  let cHandleChangePage = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sPage = oEvent.target.value;
    cSetStatePage(sPage);
  };

  let cHandleKeyPressPage = (oEvent: any) => {
    if (oEvent.charCode == 13) {
      // 
    }
  };

  let cHandleBlurPage = (oEvent: any) => {
    let iPage = Number(sStatePage);
  };

  let cHandleSearchClick = (oEvent: any) => {
    cSetStateSearchDialog(true);
  };

  let cHandleSearchCancleClick = (oEvent: any) => {
    cSetStateSearchDialog(false);

  };

  let cHandlePageClick = (oEvent: any) => {
    cSetStatePageDialog(true);
  };

  let cHandlePageCancleClick = (oEvent: any) => {
    cSetStatePageDialog(false);
  };
  /*
   * NOTE: 一般使用者 习惯从 1 开始标记为第一页
   * NOTE: API 接口服务 1 开始标记为第一页
   * NOTE: <DataGrid>  0 开始标记为第一页
   * NOTE: MYSQL  0 开始标记为第一页

   */

  return (
    <div className="app-user">
      <div className={oClasses.paginationWrapper}>
        <IconButton color="primary" aria-label="筛选" className={oClasses.searchButton} onClick={cHandleSearchClick}>
          <SearchIcon></SearchIcon>
        </IconButton>
        <FormControl className={oClasses.formControl}>
          <Select labelId="demo-simple-select-label" id="size" value={iStateLimit} onChange={cHandleChangeSize}>
            <MenuItem value={10}>10笔</MenuItem>
            <MenuItem value={20}>20笔</MenuItem>
            <MenuItem value={50}>50笔</MenuItem>
            <MenuItem value={100}>100笔</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          className={oClasses.pagination}
          count={iStateCount}
          size="small"
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

        <span className={oClasses.page}>
          <TextField
            id="page"
            value={sStatePage}
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
      <div className={oClasses.dataGridWrapper}>
        <DataGrid
          className={clsx(oClasses.dataGrid, {})}
          columns={aColumns}
          headerHeight={28}
          rowCount={aStateRows.length == 0 ? 0 : iStateCount}
          rows={aStateRows}
          page={0}
          pageSize={oParams.size}
          loading={bStateLoading}
          checkboxSelection={true}
          disableSelectionOnClick={true}
          hideFooterPagination={true}
          scrollbarSize={0}
          hideFooter={true}
          autoHeight={true}
          autoPageSize={false}
          disableColumnMenu={true}
          rowHeight={oLimitToHeight[iStateLimit] ?? oLimitToHeight[10]}
          components={{
            NoRowsOverlay: Components.NoRowsOverlay,
            LoadingOverlay: Components.LoadingOverlay
          }}
        />
      </div>
      <Components.Cards rows={aStateRows} loading={bStateLoading} Card={CardForAppUser}></Components.Cards>

    </div>
  );
}
export default Hocs.authenticator(Hocs.tab(Hocs.page(Hocs.title(Index))));
