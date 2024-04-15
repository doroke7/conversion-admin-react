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
import State from './State/Index';
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


  let iLimit = Number(oParams.limit || 20);
  let iPage = Number(oParams.page || 1);
  let iAppId = Number(oParams.appId || 0);
  let sName = String(oUrlSearchParams.get('name')) || '';

  let oMe = useSelector((oStore: any) => (oStore.me));
  let aAppPipelines = useSelector((oStore: any) => (oStore.appPipelines));

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
      field: 'appUserName',
      headerName: '账号',
      description: '账号',
      sortable: false,
      flex: 1,
      width: 184,
      align: 'left',
      valueGetter: (oProps: any) => (oProps?.row?.appUser?.name)
    },
    {
      field: 'name',
      headerName: '档名',
      description: '名称',
      sortable: false,
      width: 385,
    },
    {
      field: 'width',
      headerName: '宽度',
      description: '宽度',
      sortable: false,
      width: 85,
    },
    {
      field: 'height',
      headerName: '高度',
      description: '高度',
      sortable: false,
      width: 85,
    },
    {
      field: 'duration',
      headerName: '时长',
      description: '时长',
      sortable: false,
      width: 145,
    },
    {
      field: 'appDownloaderStageSize',
      headerName: '容量',
      description: '容量',
      sortable: false,
      width: 145,
      valueGetter: (oProps: any) => (utilities.size(oProps.row?.appDownloaderStage?.size ?? 0))

    },
    {
      field: 'state',
      headerName: '状态',
      description: '状态',
      sortable: false,
      width: 80,
      renderCell: (oProps: any) => {
        let iState = oProps?.row?.state;
        return (
          <State value={iState}>
          </State>
        );
      },
    },
    {
      field: 'addedTime',
      headerName: '启动时间',
      description: '启动时间',
      sortable: false,
      width: 170,
      valueGetter: (oProps: any) => (utilities.dateTime(oProps.row?.addedTime))
    },
    {
      field: 'tool',
      headerName: '操作',
      description: '操作',
      sortable: false,
      width: 140
    },
  ];

  useEffect(() => {
    cSetStateLimit(iLimit);
  }, [oParams.limit]);

  useEffect(() => {
    cSetStatePage(iPage);
  }, [oParams.page]);

  useEffect(() => {
    cSetStateRows(aAppPipelines);
  }, [aAppPipelines]);

  useEffect(() => {
    (async () => {

      cSetStateLoading(true);

      let oParam = {};
      let oOption = {
        appId: iAppId,
        page: iPage,
        limit: iLimit
      };
      let oSearch = {};

      sName && (oSearch = {
        ...oSearch,
        name: sName
      });
      let oResponse = await Sdks.Admin.Resource.AppPipeline.getShowOnes(oParam, oOption, oSearch);

      let iNumber = Number(oResponse?.data?.raw?.number ?? 0);
      let iCount = Math.ceil((oResponse?.data?.raw?.number ?? 0) / (iLimit ?? 10));
      let aAppPipelines = oResponse?.data?.raw?.ones ?? [];

      oDispatch(actions.appPipelines.set(aAppPipelines));

      cSetStateNumer(iNumber);
      cSetStateCount(iCount);
      cSetStateLoading(false);

    })();
  }, [iStatePage, iStateLimit]);

  let cHandleClickNameOfButton = (oEvent: React.SyntheticEvent<unknown>) => {

    if (sStateName.length == 0) {
      let oMessage = {
        code: -1,
        message: '请输入视频前缀名称',
        time: 3 * 1000
      };

      events.emit('Alerts-onAlert', oMessage);
      return;
    }



    let oSearch = {
      name: sStateName
    };
    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, 1, oParams.limit, oSearch);

    oHistory.push(sUrl);
  };

  let cHandleChangePageOfPagination = (oEvent: React.ChangeEvent<unknown>, iPage: number) => {

    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, {});
    oHistory.push(sUrl);
  };

  let cHandleChangeLimitOfSelect = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let iLimit = Number(oEvent.target.value);

    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, oParams.page, iLimit, {});

    oHistory.push(sUrl);
  };

  let cHandleChangeNameOfTextField = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sName = String(oEvent.target.value);

    cSetStateName(sName);
  };

  let cHandleChangePageOfTextField = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let iPage = Number(oEvent.target.value);
    cSetStatePage(iPage);

  };

  let cHandleKeyPressPageOfTextField = (oEvent: any) => {
    if (oEvent.charCode == 13) {
      let iPage = Number(oEvent.target.value);

      let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, {});

      oHistory.push(sUrl);
    }
  };

  let cHandleKeyPressNameOfTextField = (oEvent: any) => {
    if (oEvent.charCode == 13) {
      let sName = String(oEvent.target.value);

      let oSearch = {};
      sName && (oSearch = {
        ...oSearch,
        name: sName
      });

      let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, oSearch);

      oHistory.push(sUrl);
    }
  };

  let cHandleBlurPageOfTextField = (oEvent: any) => {
    let iPage = Number(oEvent.target.value);

    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, {});


    oHistory.push(sUrl);
  };



  let cHandlePageClick = (oEvent: any) => {
  };

  return (
    <div className="app-pipeline">
      <div className={oClasses.top}>
        <div className={oClasses.searchWrapper}>
          <TextField
            className={clsx(oClasses.textField, oClasses.textFieldName)}
            id="name"
            label="档名"
            size="small"
            variant="outlined"
            value={sStateName}
            onChange={cHandleChangeNameOfTextField}
            onKeyPress={cHandleKeyPressNameOfTextField}
          />
          <Button
            color="primary"
            className={oClasses.button}
            variant="outlined"
            endIcon={<SearchIcon></SearchIcon>}
            onClick={cHandleClickNameOfButton}
          >
            检索
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
