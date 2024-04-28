import React, { useState, useEffect, useLayoutEffect, Component, useMemo } from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import { GridOverlay, DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import FlipCameraAndroidTwoToneIcon from '@material-ui/icons/FlipCameraAndroidTwoTone';
import AddAlertTwoToneIcon from '@material-ui/icons/AddAlertTwoTone';
import MovieFilterTwoToneIcon from '@material-ui/icons/MovieFilterTwoTone';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DirectionsIcon from '@material-ui/icons/Directions';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import Rotate90DegreesCcwOutlinedIcon from '@material-ui/icons/Rotate90DegreesCcwOutlined';
import Rotate90DegreesCcwRoundedIcon from '@material-ui/icons/Rotate90DegreesCcwRounded';
import Rotate90DegreesCcwTwoToneIcon from '@material-ui/icons/Rotate90DegreesCcwTwoTone';
import Rotate90DegreesCcwSharpIcon from '@material-ui/icons/Rotate90DegreesCcwSharp';
import UpdateIcon from '@material-ui/icons/Update';
import InfoIcon from '@material-ui/icons/Info';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';

import Zoom from '@material-ui/core/Zoom';
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
  let [bStateOpen, cSetStateOpen] = useState<boolean>(false);


  let iLimit = Number(oParams.limit || 20);
  let iPage = Number(oParams.page || 1);
  let iAppId = Number(oParams.appId || 0);
  let sName = String(oUrlSearchParams.get('name') || '');
  let iAppUserId = Number(oUrlSearchParams.get('app-user-id') || 0);

  let oMe = useSelector((oStore: any) => (oStore.me));
  let aAppPipelines = useSelector((oStore: any) => (oStore.appPipelines));
  let oAppPipeline = useSelector((oStore: any) => (oStore.appPipeline));
  let oAuthorizations = useSelector((oStore: any) => (oStore.authorizations));

  let aSteps = [
    '傳輸資源',
    '資源下载',
    '資源转码',
    '資源加密',
    '資源上传',
    '資源回调',
    '資源预热',
  ];


  useEffect(() => {
    (async () => {

      let oParam = {};
      let oOption = {};
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
    console.log('aAppPipelines=', aAppPipelines);

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

  let cHandleDetailClick = (iId: number) => {
    return async (oEvent: React.SyntheticEvent<unknown>) => {

      cSetStateOpen(true);
      let oParam = {};
      let oOption = {
        appId: iAppId
      };
      let oSearch = {
        id: iId
      };

      let oResponse = await Sdks.Admin.Resource.AppPipeline.getShowOne(oParam, oOption, oSearch);


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

      let oAppPipeline = oResponse?.data?.raw?.one ?? {};
      oDispatch(actions.appPipeline.set(oAppPipeline));

      console.log('oAppPipeline=', oAppPipeline);

    };
  };

  let cHandleClose = async (oEvent: React.SyntheticEvent<unknown>) => {

    cSetStateOpen(false);
  }


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
      sortable: false,
      width: 160,
      align: 'left',
      valueGetter: (oProps: any) => (oProps?.row?.appUser?.name)
    },
    {
      field: 'name',
      headerName: '档名',
      sortable: false,
      flex: 1,
    },
    {
      field: 'width',
      headerName: '宽度',
      sortable: false,
      minWidth: 20,
    },
    {
      field: 'height',
      headerName: '高度',
      sortable: false,
      minWidth: 20,
    },
    {
      field: 'duration',
      headerName: '时长',
      sortable: false,
      minWidth: 30,
      valueGetter: (oProps: any) => (utilities.hhmmss(oProps.row?.duration ?? 0))
    },
    {
      field: 'appDownloaderStageSize',
      headerName: '容量',
      sortable: false,
      minWidth: 20,
      valueGetter: (oProps: any) => (utilities.size(oProps.row?.appDownloaderStage?.size ?? 0))

    },
    {
      field: 'state',
      headerName: '进度',
      sortable: false,
      width: 80,
      renderCell: (oProps: any) => {
        let iState = oProps?.row?.state;
        let iStatus = oProps?.row?.status;
        let iId = oProps?.row?.id;

        return (
          <State id={iId} state={iState} status={iStatus}>
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

        let iFirstRandom = useMemo(() => {
          let iResult = Math.floor(Math.random() * 9);
          return iResult;
        }, iId);
        let iSecondRandom = useMemo(() => {
          let iResult = Math.floor(Math.random() * 9);
          return iResult;
        }, iId);

        let iThirdRandom = useMemo(() => {
          let iResult = Math.floor(Math.random() * 9);
          return iResult;
        }, iId);

        return (
          <div>
            <Tooltip title="详情" arrow placement="top">

              <IconButton
                className={clsx(oClasses.iconButton, oClasses.iconButtonDetail, {
                  [oClasses.iconButtonAnimation000]: iThirdRandom == 0,
                  [oClasses.iconButtonAnimation005]: iThirdRandom == 1,
                  [oClasses.iconButtonAnimation010]: iThirdRandom == 2,
                  [oClasses.iconButtonAnimation015]: iThirdRandom == 3,
                  [oClasses.iconButtonAnimation020]: iThirdRandom == 4,
                  [oClasses.iconButtonAnimation025]: iThirdRandom == 5,
                  [oClasses.iconButtonAnimation030]: iThirdRandom == 6,
                  [oClasses.iconButtonAnimation035]: iThirdRandom == 7,
                  [oClasses.iconButtonAnimation040]: iThirdRandom == 8,
                })}
                size="medium"
                disabled={false}
                onClick={cHandleDetailClick(iId)}

              >
                <InfoIcon />
              </IconButton>

            </Tooltip>

            <Tooltip title="转码" arrow placement="top">

              <IconButton
                className={clsx(oClasses.iconButton, oClasses.iconButtonTranscoder, {
                  [oClasses.iconButtonAnimation000]: iFirstRandom == 0,
                  [oClasses.iconButtonAnimation005]: iFirstRandom == 1,
                  [oClasses.iconButtonAnimation010]: iFirstRandom == 2,
                  [oClasses.iconButtonAnimation015]: iFirstRandom == 3,
                  [oClasses.iconButtonAnimation020]: iFirstRandom == 4,
                  [oClasses.iconButtonAnimation025]: iFirstRandom == 5,
                  [oClasses.iconButtonAnimation030]: iFirstRandom == 6,
                  [oClasses.iconButtonAnimation035]: iFirstRandom == 7,
                  [oClasses.iconButtonAnimation040]: iFirstRandom == 8,
                })}
                size="medium"
                onClick={cHandleTranscoderClick(iId)}
                disabled={bTranscoderDisable}

              >
                <UpdateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="回调" arrow placement="top">
              <IconButton
                className={clsx(oClasses.iconButton, oClasses.iconButtonNotifier, {
                  [oClasses.iconButtonAnimation000]: iSecondRandom == 0,
                  [oClasses.iconButtonAnimation005]: iSecondRandom == 1,
                  [oClasses.iconButtonAnimation010]: iSecondRandom == 2,
                  [oClasses.iconButtonAnimation015]: iSecondRandom == 3,
                  [oClasses.iconButtonAnimation020]: iSecondRandom == 4,
                  [oClasses.iconButtonAnimation025]: iSecondRandom == 5,
                  [oClasses.iconButtonAnimation030]: iSecondRandom == 6,
                  [oClasses.iconButtonAnimation035]: iSecondRandom == 7,
                  [oClasses.iconButtonAnimation040]: iSecondRandom == 8,
                })}
                size="medium"
                disabled={bNotifierDisable}
                onClick={cHandleNotifierClick(iId)}
              >
                <DirectionsIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  let iAppPipelineState = oAppPipeline?.state ?? 0;
  let iAppPipelineStaus = oAppPipeline?.status ?? 0;

  iAppPipelineState = iAppPipelineStaus >= 2 ? iAppPipelineState : iAppPipelineState - 1;

  return (
    <div className="app-pipeline">
      <Dialog 
        onClose={cHandleClose} 
        aria-labelledby="customized-dialog-title" 
        open={bStateOpen}
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle id="customized-dialog-title">
          {oAppPipeline?.name ?? ''}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>

            <Stepper activeStep={iAppPipelineState} alternativeLabel>
              <Step>
                <StepLabel 
                  
                  error={oAppPipeline?.state == 1 && oAppPipeline?.status == -1}
                  optional={<Typography display={'block'} align={'center'} variant="caption" color="initial">{utilities.dateTime(oAppPipeline?.appDownloaderStage?.editedTime ?? '')}</Typography>}
                >
                  資源下载
                </StepLabel>
              </Step>
              <Step>
                <StepLabel 
                  error={oAppPipeline?.state == 2 && oAppPipeline?.status == -1}
                  optional={<Typography display={'block'} align={'center'} variant="caption" color="initial">{utilities.dateTime(oAppPipeline?.appTranscoderStage?.editedTime ?? '')}</Typography>}
                >
                  資源转码
                </StepLabel>
              </Step>
              <Step>
                <StepLabel 
                  error={oAppPipeline?.state == 3 && oAppPipeline?.status == -1}
                  optional={<Typography display={'block'} align={'center'} variant="caption" color="initial">{utilities.dateTime(oAppPipeline?.appEncrypterStage?.editedTime ?? '')}</Typography>}
                >
                  資源加密
                </StepLabel>
              </Step>
              <Step>
                <StepLabel 
                  error={oAppPipeline?.state == 4 && oAppPipeline?.status == -1}
                  optional={<Typography display={'block'} align={'center'} variant="caption" color="initial">{utilities.dateTime(oAppPipeline?.appUploaderStage?.editedTime ?? '')}</Typography>}
                >
                  資源上传
                </StepLabel>
              </Step>
              <Step>
                <StepLabel 
                  error={oAppPipeline?.state == 5 && oAppPipeline?.status == -1}
                  optional={<Typography display={'block'} align={'center'} variant="caption" color="initial">{utilities.dateTime(oAppPipeline?.appNotifierStage?.editedTime ?? '')}</Typography>}
                >
                  資源回调
                </StepLabel>
              </Step>
              <Step>
                <StepLabel 
                  error={oAppPipeline?.state == 6 && oAppPipeline?.status == -1}
                  optional={<Typography display={'block'} align={'center'} variant="caption" color="initial">{utilities.dateTime(oAppPipeline?.appWarmerStage?.editedTime ?? '')}</Typography>}
                >
                  資源预热
                </StepLabel>
              </Step>
            </Stepper>
          </Typography>
          {/* <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography> */}
        </DialogContent>
      </Dialog>
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
export default Hocs.authorization(Hocs.tab(Hocs.title(Index)));
