import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import WidgetsIcon from '@material-ui/icons/Widgets';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';

import Hocs from '@/admin/Hocs';
import Sdks from '@/admin/Sdks/Index';
import events from '@/admin/events/index';
import Components from '@/admin/Components/Index';
import utilities from '@/admin/utilities/index';
import actions from '@/admin/actions/';


import hooks from '@/admin/hooks';
import style from './style';

function Index(oProps: any): any {
  let cSetPageMax = oProps.setPageMax ?? (() => void 0);

  let oClasses: any = style(void 0);
  let oHistory = useHistory();

  let oParams: any = useParams();
  let oRouteMatch = useRouteMatch();
  let oUrlSearchParams = hooks.useURLSearchParams();
  let oDispatch = useDispatch();

  let [sStateName, cSetStateName] = useState<string>('');
  let [iStateNumer, cSetStateNumer] = useState<number>(0);
  let [iStateCount, cSetStateCount] = useState<number>(0);
  let [bStateLoading, cSetStateLoading] = useState<boolean>(false);
  let [aStateRows, cSetStateRows] = useState<any[]>([]);
  let [iStateLimit, cSetStateLimit] = useState<number>(20);
  let [iStatePage, cSetStatePage] = useState<number>(1);


  let iLimit = Number(oUrlSearchParams.get('limit')) || 20;
  let iPage = Number(oUrlSearchParams.get('page')) || 1;

  let oMe = useSelector((oStore: any) => (oStore.me));
  let aAppUsers = useSelector((oStore: any) => (oStore.appUsers));

  let aColumns: any[] = [
    {
      field: 'id',
      headerName: 'ID',
      description: '流水号',
      width: 80,
      sortable: false,
      editable: false
    },
    {
      field: 'appUrl',
      headerName: '项目',
      description: '项目',
      sortable: false,
      width: 84,
      align: 'left',
      renderCell: (oProps: any) => {
        let sTitle = oProps?.row?.app?.title;
        let sUrl = oProps?.row?.app?.url;

        return (
          <Tooltip title={sTitle} placement="right">
            <Avatar className={clsx(oClasses.avatar, {})} variant="rounded" src={sUrl}>
              {sTitle ? sTitle : <WidgetsIcon></WidgetsIcon>}
            </Avatar>
          </Tooltip>
        );
      },
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
      field: 'sort',
      headerName: '优先级',
      description: '优先级',
      width: 120,
      sortable: false,
      editable: false
    },
    {
      field: 'addedTime',
      headerName: '创建时间',
      description: '创建时间',
      sortable: false,
      flex: 1,
      width: 200,
      valueGetter: (oProps: any) => (utilities.dateTime(oProps.row?.addedTime))
    },
    {
      field: 'tool',
      headerName: '操作',
      description: '操作',
      sortable: false,
      width: 200
    },
  ];

  useEffect(() => {
    cSetStateRows(aAppUsers);
  }, [aAppUsers]);

  useEffect(() => {
    (async () => {

      cSetStateLoading(true);

      let oParam = {};
      let oOption = {
        page: iPage,
        limit: iLimit
      };
      let oSearch = {};

      let oResponse = await Sdks.Admin.Resource.AppUser.getShowOnes(oParam, oOption, oSearch);

      let iNumber = Number(oResponse?.data?.raw?.number ?? 0);
      let iCount = Math.ceil((oResponse?.data?.raw?.number ?? 0) / (iLimit ?? 10));
      let aAppUsers = oResponse?.data?.raw?.ones ?? [];
      oDispatch(actions.appUsers.set(aAppUsers));

      cSetStateNumer(iNumber);
      cSetStateCount(iCount);
      cSetStateLoading(false);
      cSetStateLimit(iLimit);
      cSetStatePage(iPage);

      cSetPageMax(iCount);

    })();
  }, [iPage, iLimit]);

  let cHandleChangePageOfPagination = (oEvent: React.ChangeEvent<unknown>, iPage: number) => {
    let oParams = {
      page: iPage,
      limit: iLimit
    };
    let sUrl = utilities.url('', oRouteMatch.path, oParams);
    oHistory.push(sUrl);
  };

  let cHandleChangeLimitOfSelect = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let iLimit = Number(oEvent.target.value);

    oParams = {
      page: iPage,
      limit: iLimit
    };
    let sUrl = utilities.url('', oRouteMatch.path, oParams);

    oHistory.push(sUrl);
  };
  let cHandleChangeNameOfTextField = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sName = oEvent.target.value;
    cSetStateName(sName);

  };


  let cHandleKeyPressNameOfTextField = (oEvent: any) => {
    if (oEvent.charCode == 13) {
      let sName = oEvent.target.value;

      let oOptions = {
        page: iStatePage,
        limit: iStateLimit,
        name: sName
      };
      let sUrl = utilities.url('', oRouteMatch.path, oOptions);

      oHistory.push(sUrl);
    }
  };


  let cHandleChangePageOfTextField = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let iPage = Number(oEvent.target.value);
    cSetStatePage(iPage);

  };

  let cHandleKeyPressPageOfTextField = (oEvent: any) => {
    if (oEvent.charCode == 13) {
      let iPage = Number(oEvent.target.value);

      let oOptions: any = {
        page: iPage,
        limit: iLimit
      };

      sStateName && (oOptions = {
        ...oOptions,
        name: sStateName
      });
      let sUrl = utilities.url('', oRouteMatch.path, oOptions);

      oHistory.push(sUrl);
    }
  };



  let cHandleBlurPageOfTextField = (oEvent: any) => {
    let iPage = Number(oEvent.target.value);

    let oOptions = {
      page: iStatePage,
      limit: iStateLimit,
    };
    let sUrl = utilities.url('', oRouteMatch.path, oOptions);

    oHistory.push(sUrl);
  };

  return (
    <div className="app-pipeline">
      <div className={oClasses.top}>
        <div className={oClasses.searchWrapper}>
          <TextField
            className={clsx(oClasses.textField, oClasses.textFieldName)}
            id="name"
            label="名称"
            size="small"
            variant="outlined"
            value={sStateName}
            onChange={cHandleChangeNameOfTextField}
            onKeyPress={cHandleKeyPressPageOfTextField}
          />
          <Button
            color="primary"
            className={oClasses.button}
            variant="outlined"
            endIcon={<SearchIcon></SearchIcon>}>
            筛选
          </Button>
        </div>
        <div className={oClasses.paginationWrapper}>
          <FormControl variant="outlined" className={oClasses.formControl}>
            <InputLabel id="demo-simple-select-filled-label">笔</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="limit"
              value={iStateLimit}
              onChange={cHandleChangeLimitOfSelect}
              label="笔"
            >
              <MenuItem className={oClasses.menuItem} value={10}>10</MenuItem>
              <MenuItem className={oClasses.menuItem} value={20}>20</MenuItem>
              <MenuItem className={oClasses.menuItem} value={50}>50</MenuItem>
              <MenuItem className={oClasses.menuItem} value={100}>100</MenuItem>
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
            page={iStatePage}
            onChange={cHandleChangePageOfPagination}
          />

          <TextField
            className={clsx(oClasses.textField, oClasses.textFieldPage)}
            id="page"
            label="页"
            size="small"
            variant="outlined"
            value={iStatePage}
            onChange={cHandleChangePageOfTextField}
            onKeyPress={cHandleKeyPressPageOfTextField}
            onBlur={cHandleBlurPageOfTextField}
          />
        </div>
      </div>

      <div className={oClasses.dataGridWrapper}>
        <DataGrid
          className={clsx(oClasses.dataGrid, {})}
          columns={aColumns}
          headerHeight={36}
          rowCount={aStateRows.length == 0 ? 0 : iStateCount}
          rows={aStateRows}
          page={0}
          pageSize={iStateLimit}
          loading={bStateLoading}
          checkboxSelection={true}
          disableSelectionOnClick={true}
          hideFooterPagination={true}
          scrollbarSize={0}
          hideFooter={true}
          autoHeight={false}
          autoPageSize={false}
          disableColumnMenu={true}
          rowHeight={35.650000000000002125}
          // 35.650000000000002125 太小  ，  
          // 35.65000000000000225 太大
          components={{
            NoRowsOverlay: Components.NoRowsOverlay,
            LoadingOverlay: Components.LoadingOverlay
          }}
        />
      </div>

    </div >
  );
}
export default Hocs.authorization(Hocs.tab(Hocs.page(Hocs.title(Index))));
