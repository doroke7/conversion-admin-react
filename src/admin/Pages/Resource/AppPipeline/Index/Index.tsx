import React, { useState, useEffect, useLayoutEffect, Component } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FlipCameraAndroidTwoToneIcon from '@material-ui/icons/FlipCameraAndroidTwoTone';
import AddAlertTwoToneIcon from '@material-ui/icons/AddAlertTwoTone';
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
  let [aStateAppUsers, cSetStateAppUsers] = useState<any[]>([]);
  let [iStateAppUserId, cSetStateAppUserId] = useState<number>(0);


  let iLimit = Number(oParams.limit || 20);
  let iPage = Number(oParams.page || 1);
  let iAppId = Number(oParams.appId || 0);
  let sName = String(oUrlSearchParams.get('name') || '');
  let iAppUserId = Number(oUrlSearchParams.get('app-user-id') || 0);

  let oMe = useSelector((oStore: any) => (oStore.me));
  let aAppPipelines = useSelector((oStore: any) => (oStore.appPipelines));
  let oAuthorizations = useSelector((oStore: any) => (oStore.authorizations));

  console.log('oAuthorizations=', oAuthorizations);

  useEffect(() => {
    (async () => {

      let oParam = {};
      let oOption = {
      };
      let oSearch = {
        appId: iAppId,
      };


      let oResponse = await Sdks.Admin.System.AppUser.getShowOnes(oParam, oOption, oSearch);

      let aAppUsers = oResponse?.data?.raw?.ones ?? [];

      cSetStateAppUsers(aAppUsers);

    })();
  }, [iAppId]);


  useEffect(() => {
    cSetStateLimit(iLimit);
  }, [oParams.limit]);

  useEffect(() => {
    cSetStatePage(iPage);
  }, [oParams.page]);

  useEffect(() => {
    cSetStateName(sName);
  }, [sName]);

  useEffect(() => {
    cSetStateAppUserId(iAppUserId);
  }, [iAppUserId]);

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

      sStateName && (oSearch = {
        ...oSearch,
        name: sStateName
      });

      iAppUserId && (oSearch = {
        ...oSearch,
        appUserId: iAppUserId
      });

      let oResponse = await Sdks.Admin.Resource.AppPipeline.getShowOnes(oParam, oOption, oSearch);

      let iNumber = Number(oResponse?.data?.raw?.number ?? 0);
      let iCount = Math.ceil((oResponse?.data?.raw?.number ?? 0) / (iLimit ?? 10));
      let aAppPipelines = oResponse?.data?.raw?.ones ?? [];
      console.log('aAppPipelines=', aAppPipelines);

      oDispatch(actions.appPipelines.set(aAppPipelines));

      cSetStateNumer(iNumber);
      cSetStateCount(iCount);
      cSetStateLoading(false);

    })();
  }, [iAppId, oParams.page, oParams.limit, sName, iAppUserId]);

  let cHandleClickOfButton = async (oEvent: React.SyntheticEvent<unknown>) => {

    let oSearch1 = {};

    iStateAppUserId && (oSearch1 = {
      ...oSearch1,
      'app-user-id': iStateAppUserId
    });

    sStateName && (oSearch1 = {
      ...oSearch1,
      name: sStateName
    });


    let oParam2 = {};
    let oOption2 = {
      appId: iAppId,
      page: iPage,
      limit: iLimit
    };

    let oSearch2 = {};

    iStateAppUserId && (oSearch2 = {
      ...oSearch1,
      'appUserId': iStateAppUserId
    });

    sStateName && (oSearch2 = {
      ...oSearch2,
      name: sStateName
    });
    cSetStateLoading(true);

    let oResponse = await Sdks.Admin.Resource.AppPipeline.getShowOnes(oParam2, oOption2, oSearch2);

    let iNumber = Number(oResponse?.data?.raw?.number ?? 0);
    let iCount = Math.ceil((oResponse?.data?.raw?.number ?? 0) / (iLimit ?? 10));
    let aAppPipelines = oResponse?.data?.raw?.ones ?? [];

    console.log('aAppPipelines=', aAppPipelines);
    oDispatch(actions.appPipelines.set(aAppPipelines));

    cSetStateNumer(iNumber);
    cSetStateCount(iCount);
    cSetStateLoading(false);

    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, 1, oParams.limit, oSearch1);

    oHistory.push(sUrl);
  };

  let cHandleChangePageOfPagination = (oEvent: React.ChangeEvent<unknown>, iPage: number) => {

    let oSearch = {};

    iStateAppUserId && (oSearch = {
      ...oSearch,
      'app-user-id': iStateAppUserId
    });

    sStateName && (oSearch = {
      ...oSearch,
      name: sStateName
    });

    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, oSearch);
    console.log(194, 'sUrl=', sUrl);
    oHistory.push(sUrl);
  };

  let cHandleChangeAppUserIdOfSelect = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let iAppUserId = Number(oEvent.target.value);

    cSetStateAppUserId(iAppUserId);
  };

  let cHandleChangeLimitOfSelect = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let iLimit = Number(oEvent.target.value);

    let oSearch = {};

    iStateAppUserId && (oSearch = {
      ...oSearch,
      'app-user-id': iStateAppUserId
    });

    sStateName && (oSearch = {
      ...oSearch,
      name: sStateName
    });

    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, oParams.page, iLimit, oSearch);

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

      let oSearch = {};

      iStateAppUserId && (oSearch = {
        ...oSearch,
        'app-user-id': iStateAppUserId
      });

      sStateName && (oSearch = {
        ...oSearch,
        name: sStateName
      });

      let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, oSearch);

      oHistory.push(sUrl);
    }
  };

  let cHandleKeyPressNameOfTextField = (oEvent: any) => {
    if (oEvent.charCode == 13) {
      let sName = String(oEvent.target.value);

      let oSearch = {};
      iStateAppUserId && (oSearch = {
        ...oSearch,
        'app-user-id': iStateAppUserId
      });

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
    let oSearch = {};

    iStateAppUserId && (oSearch = {
      ...oSearch,
      'app-user-id': iStateAppUserId
    });

    sStateName && (oSearch = {
      ...oSearch,
      name: sStateName
    });

    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, oSearch);


    oHistory.push(sUrl);
  };



  let cHandleTranscoderClick = (iId: number) => {
    return async (oEvent: React.SyntheticEvent<unknown>) => {
      let oParam = {};
      let oOption = {
        appId: iAppId
      };
      let oSearch = {
        id: iId
      };

      let oResponse = await Sdks.Admin.System.AppPipeline.postTranscodeOne(oParam, oOption, oSearch);

      if (!oResponse || oResponse?.data?.code <= -1) {
        let iCode = oResponse?.data?.code;
        let sMessage = oResponse?.data?.message ?? '未知的失败信息';
        let oMessage = {
          code: iCode,
          message: sMessage,
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      };

      if (oResponse && oResponse?.data?.code >= 0) {
        let iCode = 0;
        let sMessage = oResponse?.data?.message ?? '未知的成功信息';
        let oMessage = {
          code: iCode,
          message: sMessage,
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      };
    };
  };

  let cHandleNotifierClick = (iId: number) => {
    return async (oEvent: React.SyntheticEvent<unknown>) => {

      let oParam = {};
      let oOption = {
        appId: iAppId
      };
      let oSearch = {
        id: iId
      };

      let oResponse = await Sdks.Admin.System.AppPipeline.postNotifyOne(oParam, oOption, oSearch);

      if (!oResponse || oResponse?.data?.code <= -1) {
        let iCode = oResponse?.data?.code;
        let sMessage = oResponse?.data?.message ?? '未知的失败信息';
        let oMessage = {
          code: iCode,
          message: sMessage,
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      };

      if (oResponse && oResponse?.data?.code >= 0) {

        let iCode = 0;
        let sMessage = oResponse?.data?.message ?? '未知的成功信息';
        let oMessage = {
          code: iCode,
          message: sMessage,
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      };
    };
  };

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
      flex: 1,
      width: 85,
    },
    {
      field: 'height',
      headerName: '高度',
      description: '高度',
      sortable: false,
      flex: 1,
      width: 85,
    },
    {
      field: 'duration',
      headerName: '时长',
      description: '时长',
      sortable: false,
      flex: 1,
      width: 145,
      valueGetter: (oProps: any) => (utilities.hhmmss(oProps.row?.duration ?? 0))
    },
    {
      field: 'appDownloaderStageSize',
      headerName: '容量',
      description: '容量',
      sortable: false,
      flex: 1,
      width: 145,
      valueGetter: (oProps: any) => (utilities.size(oProps.row?.appDownloaderStage?.size ?? 0))

    },
    {
      field: 'state',
      headerName: '进度',
      description: '进度',
      sortable: false,
      width: 80,
      renderCell: (oProps: any) => {
        let iState = oProps?.row?.state;
        let iId = oProps?.row?.id;

        return (
          <State id={iId} value={iState}>
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
      width: 140,
      renderCell: (oProps: any) => {
        let iId = oProps?.row?.id;
        let bTranscoderDisable = oProps?.row?.state == 0;

        let bNotifierDisable = oProps?.row?.state < 5;

        return (
          <div>
            <Tooltip title="转码" arrow placement="top">
              <IconButton
                onClick={cHandleTranscoderClick(iId)}
                className={clsx(oClasses.iconButton, oClasses.iconButtonTranscoder)}
                color="primary"
                aria-label=""
                component="span"
                disabled={bTranscoderDisable}
              >
                <FlipCameraAndroidTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="回调" arrow placement="top">
              <IconButton
                onClick={cHandleNotifierClick(iId)}
                className={clsx(oClasses.iconButton, oClasses.iconButtonNotifier)}
                color="primary"
                aria-label=""
                component="span"
                disabled={bNotifierDisable}
              >
                <AddAlertTwoToneIcon />
              </IconButton>
            </Tooltip>


          </div>
        );
      },
    },
  ];

  return (
    <div className="app-pipeline">
      <div className={oClasses.top}>
        <div className={oClasses.searchWrapper}>
          <FormControl variant="outlined" className={clsx(oClasses.formControl, oClasses.formControlAppUserId)}>
            <InputLabel id="app-user-id">账号</InputLabel>
            <Select
              labelId="app-user-id"
              id="app-user-id"
              value={iStateAppUserId}
              onChange={cHandleChangeAppUserIdOfSelect}
              label="账号"
            >
              <MenuItem className={oClasses.menuItem} value={0}>-</MenuItem>
              {aStateAppUsers.map((oStateAppUser, sKey) => (
                <MenuItem key={sKey} className={oClasses.menuItem} value={oStateAppUser?.id ?? 0}>{oStateAppUser?.name ?? ''}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
            className={oClasses.button}
            color="primary"
            variant="outlined"
            endIcon={<SearchIcon></SearchIcon>}
            onClick={cHandleClickOfButton}
          >
            检索
          </Button>
        </div>
        <div className={oClasses.paginationWrapper}>
          <FormControl variant="outlined" className={clsx(oClasses.formControl, oClasses.formControlLimit)}>
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
            siblingCount={0}
            boundaryCount={1}
            //   showFirstButton
            // showLastButton
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
