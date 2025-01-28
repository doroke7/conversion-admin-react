import React, { useRef, useState, useEffect, useLayoutEffect, Component, useMemo, forwardRef, useCallback } from 'react';
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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import DirectionsIcon from '@material-ui/icons/Directions';
import ErrorIcon from '@material-ui/icons/Error';
import UpdateIcon from '@material-ui/icons/Update';
import InfoIcon from '@material-ui/icons/Info';
import CachedIcon from '@material-ui/icons/Cached';
import Grow from '@material-ui/core/Grow';

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

  let [sStateKeyword, cSetStateKeyword] = useState<string>('');
  let [iStateAppUserId, cSetStateAppUserId] = useState<number>(0);
  let [iStateState, cSetStateState] = useState<number>(0);

  let [sStateTitle, cSetStateTitle] = useState<string>('');
  let [iStateId, cSetStateId] = useState<number>(0);
  let [iStateCount, cSetStateCount] = useState<number>(0);
  let [bStateLoading, cSetStateLoading] = useState<boolean>(false);
  let [bStateButtonLoading, cSetStateButtonLoading] = useState<boolean>(false);
  let [aStateAppPipelines, cSetStateAppPipelines] = useState<any[]>([]);
  let [iStateLimit, cSetStateLimit] = useState<number>(20);
  let [iStatePage, cSetStatePage] = useState<number>(1);
  let [aStateAppUsers, cSetStateAppUsers] = useState<any[]>([]);
  let [aStateServers, cSetStateServers] = useState<any[]>([]);
  let [iStateActiveStep, cSetStateActiveStep] = useState<number>(1);
  let [sStateServerUuid, cSetStateServerUuid] = useState<string>('DEFAULT');
  let [bStateDetailDialogOpen, cSetStateDetailDialogOpen] = useState<boolean>(false);
  let [bStateTranscoderDialogOpen, cSetStateTranscoderDialogOpen] = useState<boolean>(false);
  let oDataGridRef = useRef();



  let iLimit = Number(oParams.limit || 20);
  let iPage = Number(oParams.page || 1);
  let iAppId = Number(oParams.appId || 0);
  let sKeyword = String(oUrlSearchParams.get('keyword') || '');
  let iAppUserId = Number(oUrlSearchParams.get('app-user-id') || 0);
  let iState = Number(oUrlSearchParams.get('state') || 0);

  let oMe = useSelector((oStore: any) => (oStore.me));
  let aAppPipelines = useSelector((oStore: any) => (oStore.appPipelines));
  let oAppPipeline = useSelector((oStore: any) => (oStore.appPipeline));
  let oAuthorizations = useSelector((oStore: any) => (oStore.authorizations));

  console.log('sKeyword=', sKeyword);

  let cScrollToTop = useCallback(() => {
    if (oDataGridRef.current) {
      let oDataGridWindow = (oDataGridRef.current as any)?.querySelector('.MuiDataGrid-window');

      oDataGridWindow.scroll({
        top: 0,
        behavior: 'smooth',
      });

    }
  }, [oDataGridRef])

  useEffect(() => {
    (async () => {

      let oParam = {};
      let oOption = {};
      let oSearch = {
        appId: iAppId,
      };

      let oAppUserResponse = await Sdks.Admin.System.AppUser.getShowOnes(oParam, oOption, oSearch);

      if (!oAppUserResponse || oAppUserResponse?.data?.code <= -1) {
        let iCode = oAppUserResponse?.data?.code;
        let sMessage = oAppUserResponse?.data?.message ?? '读取账户列表失败';
        let oMessage = {
          code: iCode,
          message: sMessage,
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      };

      let aAppUsers = oAppUserResponse?.data?.raw?.ones ?? [];
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
    cSetStateKeyword(sKeyword);
  }, [sKeyword]);

  useEffect(() => {
    cSetStateState(iState);
  }, [iState]);


  useEffect(() => {
    cSetStateAppUserId(iAppUserId);
  }, [iAppUserId]);

  useEffect(() => {

    cSetStateAppPipelines(aAppPipelines);
  }, [aAppPipelines]);

  useEffect(() => {
    let iActiveStep = oAppPipeline?.state ?? 0;
    iActiveStep = iActiveStep > 6 ? 6 : iActiveStep;
    cSetStateActiveStep(iActiveStep);
  }, [oAppPipeline?.state]);

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

      sKeyword && (oSearch = {
        ...oSearch,
        keyword: sKeyword
      });

      iAppUserId && (oSearch = {
        ...oSearch,
        appUserId: iAppUserId
      });

      iState && (oSearch = {
        ...oSearch,
        state: iState
      });

      console.log('oSearch=', oSearch);

      let oAppPipelineResponse = await Sdks.Admin.Resource.AppPipeline.getShowOnes(oParam, oOption, oSearch);

      if (!oAppPipelineResponse || oAppPipelineResponse?.data?.code <= -1) {
        let iCode = 0;
        iCode = !oAppPipelineResponse ? -4 : iCode;
        iCode = oAppPipelineResponse?.data?.code <= -1 ? oAppPipelineResponse?.data?.code : iCode;

        let sMessage = oAppPipelineResponse?.data?.message ?? '读取任务列表失败';
        let oMessage = {
          code: iCode,
          message: sMessage,
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      };

      let iNumber = Number(oAppPipelineResponse?.data?.raw?.number ?? 0);
      let iCount = Math.ceil((oAppPipelineResponse?.data?.raw?.number ?? 0) / (iLimit ?? 10));
      let aAppPipelines = oAppPipelineResponse?.data?.raw?.ones ?? [];

      oDispatch(actions.appPipelines.set(aAppPipelines));

      cSetStateCount(iCount);
      cSetStateLoading(false);

      let oParam2 = {};
      let oOption2 = {
      };
      let oSearch2 = {
        appId: iAppId,

      };

      let oServerResponse = await Sdks.Admin.System.Server.getShowOnes(oParam2, oOption2, oSearch2);


      if (!oServerResponse || oServerResponse?.data?.code <= -1) {
        let iCode = oServerResponse?.data?.code;
        let sMessage = oServerResponse?.data?.message ?? '读取节点列表失败';
        let oMessage = {
          code: iCode,
          message: sMessage,
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      };

      let aServers = oServerResponse?.data?.raw?.ones ?? [];

      cSetStateServers(aServers);


    })();
  }, [iAppId, oParams.page, oParams.limit, sKeyword, iAppUserId, iState]);

  let cHandleClickOfSearchButton = async (oEvent: React.SyntheticEvent<unknown>) => {

    if (iAppUserId != iStateAppUserId || sKeyword != sStateKeyword || iState != iStateState || iPage != 1) {
      cSetStateLoading(true);

      cScrollToTop();

      let oSearch1 = {};
      // 查询的请求 的 params 数据应该 从 state 取出

      iStateAppUserId && (oSearch1 = {
        ...oSearch1,
        'app-user-id': iStateAppUserId
      });

      sStateKeyword && (oSearch1 = {
        ...oSearch1,
        keyword: sStateKeyword
      });

      iStateState && (oSearch1 = {
        ...oSearch1,
        state: iStateState
      });

      let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, 1, oParams.limit, oSearch1);

      oHistory.push(sUrl);
    };

    if (iAppUserId == iStateAppUserId && sKeyword == sStateKeyword && iState == iStateState && iPage == 1) {
      cSetStateLoading(true);

      cScrollToTop();

      let oParam2 = {};
      let oOption2 = {
        appId: iAppId,
        page: iPage,
        limit: iLimit
      };
      let oSearch2 = {};

      iStateAppUserId && (oSearch2 = {
        ...oSearch2,
        'appUserId': iStateAppUserId
      });

      sStateKeyword && (oSearch2 = {
        ...oSearch2,
        keyword: sStateKeyword
      });

      iStateState && (oSearch2 = {
        ...oSearch2,
        state: iStateState
      });


      let oResponse = await Sdks.Admin.Resource.AppPipeline.getShowOnes(oParam2, oOption2, oSearch2);


      if (!oResponse || oResponse?.data?.code <= -1) {
        let iCode = oResponse?.data?.code;
        iCode = iCode < 0 ? iCode : -4;

        let sMessage = oResponse?.data?.message ?? '读取任务列表的未知失败讯息';
        let oMessage = {
          code: iCode,
          message: sMessage,
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      };

      let iNumber = Number(oResponse?.data?.raw?.number ?? 0);
      let iCount = Math.ceil((oResponse?.data?.raw?.number ?? 0) / (iLimit ?? 10));
      let aAppPipelines = oResponse?.data?.raw?.ones ?? [];

      oDispatch(actions.appPipelines.set(aAppPipelines));

      cSetStateCount(iCount);
      cSetStateLoading(false);
    };


  };

  let cHandleClickOfRefreshButton = async (oEvent: React.SyntheticEvent<unknown>) => {

    cSetStateLoading(true);

    cScrollToTop();

    let oParam2 = {};
    let oOption2 = {
      appId: iAppId,
      page: iPage,
      limit: iLimit
    };
    let oSearch2 = {};

    // 刷新的请求 的 params 数据应该 从 url 取出

    if(iAppUserId) {
      oSearch2 = {
        ...oSearch2,
        'appUserId': iAppUserId
      };

      cSetStateAppUserId(iAppUserId);
    };

    if(sKeyword) {
      oSearch2 = {
        ...oSearch2,
        keyword: sKeyword
      };
      cSetStateKeyword(sKeyword);

    };

    if(iState >= 0) {
      oSearch2 = {
        ...oSearch2,
        state: iState
      };
      cSetStateState(iState);

    };


    console.log('oSearch2=', oSearch2);


    let oResponse = await Sdks.Admin.Resource.AppPipeline.getShowOnes(oParam2, oOption2, oSearch2);


    if (!oResponse || oResponse?.data?.code <= -1) {
      let iCode = oResponse?.data?.code;
      iCode = iCode < 0 ? iCode : -4;

      let sMessage = oResponse?.data?.message ?? '读取任务列表的未知失败讯息';
      let oMessage = {
        code: iCode,
        message: sMessage,
        time: 2 * 1000
      };
      events.emit('Alerts-onAlert', oMessage);
    };

    let iNumber = Number(oResponse?.data?.raw?.number ?? 0);
    let iCount = Math.ceil((oResponse?.data?.raw?.number ?? 0) / (iLimit ?? 10));
    let aAppPipelines = oResponse?.data?.raw?.ones ?? [];

    oDispatch(actions.appPipelines.set(aAppPipelines));

    cSetStateCount(iCount);
    cSetStateLoading(false);

  };

  let cHandleChangePageOfPagination = (oEvent: React.ChangeEvent<unknown>, iPage: number) => {

    cScrollToTop();


    let oSearch = {};

    iStateAppUserId && (oSearch = {
      ...oSearch,
      'app-user-id': iStateAppUserId
    });

    sStateKeyword && (oSearch = {
      ...oSearch,
      keyword: sStateKeyword
    });

    iStateState && (oSearch = {
      ...oSearch,
      state: iStateState
    });


    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, oSearch);
    oHistory.push(sUrl);
  };

  let cHandleChangeAppUserIdOfSelect = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let iAppUserId = Number(oEvent.target.value);

    cSetStateAppUserId(iAppUserId);
  };

  let cHandleChangeStateOfSelect = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let iState = Number(oEvent.target.value);

    cSetStateState(iState);
  };

  let cHandleChangeServerUuidOfSelect = (oEvent: React.ChangeEvent<{ value: unknown }>) => {
    let sServerUuid = String(oEvent.target.value);

    cSetStateServerUuid(sServerUuid);
  };

  let cHandleChangeLimitOfSelect = (oEvent: React.ChangeEvent<{ value: unknown }>) => {

    cScrollToTop();


    let iLimit = Number(oEvent.target.value);

    let oSearch = {};

    iStateAppUserId && (oSearch = {
      ...oSearch,
      'app-user-id': iStateAppUserId
    });

    sStateKeyword && (oSearch = {
      ...oSearch,
      keyword: sStateKeyword
    });

    iStateState && (oSearch = {
      ...oSearch,
      state: iStateState
    });

    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, oParams.page, iLimit, oSearch);

    oHistory.push(sUrl);
  };

  let cHandleChangeKeywordOfTextField = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    let sKeyword = String(oEvent.target.value);

    cSetStateKeyword(sKeyword);
  };

  let cHandleChangePageOfTextField = (oEvent: React.ChangeEvent<HTMLInputElement>) => {
    cScrollToTop();


    let iPage = Number(oEvent.target.value);

    cSetStatePage(iPage);

  };

  let cHandleKeyPressPageOfTextField = (oEvent: any) => {
    if (oEvent.charCode == 13) {
      cScrollToTop();

      let iPage = Number(oEvent.target.value);

      let oSearch = {};

      iStateAppUserId && (oSearch = {
        ...oSearch,
        'app-user-id': iStateAppUserId
      });

      sStateKeyword && (oSearch = {
        ...oSearch,
        keyword: sStateKeyword
      });

      iStateState && (oSearch = {
        ...oSearch,
        state: iStateState
      });

      let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, oSearch);

      oHistory.push(sUrl);
    }
  };

  let cHandleKeyPressKeywordOfTextField = (oEvent: any) => {
    if (oEvent.charCode == 13) {

      cScrollToTop();

      let sKeyword = String(oEvent.target.value);

      let oSearch = {};
      iStateAppUserId && (oSearch = {
        ...oSearch,
        'app-user-id': iStateAppUserId
      });

      sKeyword && (oSearch = {
        ...oSearch,
        keyword: sKeyword
      });

      iStateState && (oSearch = {
        ...oSearch,
        state: iStateState
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

    sStateKeyword && (oSearch = {
      ...oSearch,
      keyword: sStateKeyword
    });

    iStateState && (oSearch = {
      ...oSearch,
      state: iStateState
    });

    let sUrl = utilities.url('', oRouteMatch.path, oParams.appId, iPage, oParams.limit, oSearch);

    oHistory.push(sUrl);
  };

  let cHandleDetailClick = (iId: number, sFilename: string, oRow: any) => {
    return async (oEvent: React.SyntheticEvent<unknown>) => {
      cSetStateTitle(sFilename);

      oDispatch(actions.appPipeline.set({}));

      cSetStateDetailDialogOpen(true);

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
        iCode = iCode < 0 ? iCode : -4;
        let sMessage = oResponse?.data?.message ?? '读取列表的未知失败信息';
        let oMessage = {
          code: iCode,
          message: sMessage,
          time: 2 * 1000
        };
        events.emit('Alerts-onAlert', oMessage);
      };

      let oAppPipeline = oResponse?.data?.raw?.one ?? {};

      console.log('oAppPipeline=', oAppPipeline);
      oDispatch(actions.appPipeline.set(oAppPipeline));


    };
  };

  let cHandleDetailDialogClose = async (oEvent: React.SyntheticEvent<unknown>) => {
    cSetStateDetailDialogOpen(false);

  };


  let cHandleTranscoderDialogClose = async (oEvent: React.SyntheticEvent<unknown>) => {
    cSetStateTranscoderDialogOpen(false);

    let oParam = {
    };
    let oOption = {
      appId: iAppId
    };
    let oSearch = {
      appId: iAppId
    };

    let aServerResponses = await Sdks.Admin.System.Server.getShowOnes(oParam, oOption, oSearch);
    let aServers = aServerResponses?.data?.raw?.ones ?? [];

    cSetStateServers(aServers);

  }


  let cHandleTranscoderClick = (iId: number, sFilename: string) => {
    return async (oEvent: React.SyntheticEvent<unknown>) => {

      cSetStateTranscoderDialogOpen(true);
      cSetStateId(iId);
      cSetStateTitle(sFilename);

    };
  };

  let cHandleTranscoderDialogClick = async (oEvent: React.SyntheticEvent<unknown>) => {

    cSetStateButtonLoading(true);
    let iId = iStateId;
    let oParam1 = {
      serverUuid: sStateServerUuid != 'DEFAULT' ? sStateServerUuid : ''
    };
    let oOption1 = {
      appId: iAppId
    };
    let oSearch1 = {
      id: iId
    };

    let oResponse = await Sdks.Admin.System.AppPipeline.postTranscodeOne(oParam1, oOption1, oSearch1);

    if (!oResponse || oResponse?.data?.code <= -1) {
      let iCode = oResponse?.data?.code;
      iCode = iCode < 0 ? iCode : -4;
      let sMessage = oResponse?.data?.message ?? '请求重新切片的未知失败信息';
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

    cSetStateButtonLoading(false);


    let oParam2 = {
    };
    let oOption2 = {
    };
    let oSearch2 = {
      appId: iAppId
    };

    cSetStateTranscoderDialogOpen(false);

    let aServerResponses = await Sdks.Admin.System.Server.getShowOnes(oParam2, oOption2, oSearch2);
    let aServers = aServerResponses?.data?.raw?.ones ?? [];

    cSetStateServers(aServers);
    cSetStateServerUuid('');

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
        iCode = iCode < 0 ? iCode : -4;
        let sMessage = oResponse?.data?.message ?? '请求重新的未知回调失败讯息';
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



  let cHandleClickStep = (iStep: number) => {

    return async (oEvent: React.SyntheticEvent<unknown>) => {
      cSetStateActiveStep(iStep);

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
      field: 'name',
      headerName: '档名',
      sortable: false,
      flex: 1,
      renderCell: (oProps: any) => {
        let sName = oProps?.row?.name;

        return (
          <div className={oClasses.cellName}>
            {sName}
          </div>
        );
      },
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
        let oRow = oProps?.row;
        let iId = oRow?.id;
        let sFilename = oRow?.name;
        let bTranscoderDisable = oRow?.state == 0;

        let bNotifierDisable = oRow?.state < 5;

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
                onClick={cHandleDetailClick(iId, sFilename, oRow)}
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
                onClick={cHandleTranscoderClick(iId, sFilename)}
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

  let iActiveStep = oAppPipeline?.state ?? 0;


  iActiveStep = oAppPipeline?.status >= 2 ? iActiveStep : iActiveStep;
  iActiveStep = oAppPipeline?.status == 1 ? iActiveStep - 1 : iActiveStep;
  iActiveStep = oAppPipeline?.status == 0 ? iActiveStep - 2 : iActiveStep;
  iActiveStep = oAppPipeline?.status == -1 ? iActiveStep - 1 : iActiveStep;

  iActiveStep = iActiveStep >= 6 ? 6 : iActiveStep;
  iActiveStep = iActiveStep <= -1 ? -1 : iActiveStep;

  type color = 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';

  let sColor1: color = 'textSecondary';
  let sColor2: color = 'textSecondary';
  let sColor3: color = 'textSecondary';
  let sColor4: color = 'textSecondary';
  let sColor5: color = 'textSecondary';
  let sColor6: color = 'textSecondary';

  let bCompleted1 = oAppPipeline?.state > 1 || (oAppPipeline?.state == 1 && oAppPipeline?.status >= 2);
  let bCompleted2 = oAppPipeline?.state > 2 || (oAppPipeline?.state == 2 && oAppPipeline?.status >= 2);
  let bCompleted3 = oAppPipeline?.state > 3 || (oAppPipeline?.state == 3 && oAppPipeline?.status >= 2);
  let bCompleted4 = oAppPipeline?.state > 4 || (oAppPipeline?.state == 4 && oAppPipeline?.status >= 2);
  let bCompleted5 = oAppPipeline?.state > 5 || (oAppPipeline?.state == 5 && oAppPipeline?.status >= 2);
  let bCompleted6 = oAppPipeline?.state > 6 || (oAppPipeline?.state == 6 && oAppPipeline?.status >= 2);

  let bError1 = (oAppPipeline?.state == 1 && oAppPipeline?.status == -1);
  let bError2 = (oAppPipeline?.state == 2 && oAppPipeline?.status == -1);
  let bError3 = (oAppPipeline?.state == 3 && oAppPipeline?.status == -1);
  let bError4 = (oAppPipeline?.state == 4 && oAppPipeline?.status == -1);
  let bError5 = (oAppPipeline?.state == 5 && oAppPipeline?.status == -1);
  let bError6 = (oAppPipeline?.state == 6 && oAppPipeline?.status == -1);


  sColor1 = bCompleted1 ? 'initial' : sColor1;
  sColor2 = bCompleted2 ? 'initial' : sColor2;
  sColor3 = bCompleted3 ? 'initial' : sColor3;
  sColor4 = bCompleted4 ? 'initial' : sColor4;
  sColor5 = bCompleted5 ? 'initial' : sColor5;
  sColor6 = bCompleted6 ? 'initial' : sColor6;

  sColor1 = bError1 ? 'error' : sColor1;
  sColor2 = bError2 ? 'error' : sColor2;
  sColor3 = bError3 ? 'error' : sColor3;
  sColor4 = bError4 ? 'error' : sColor4;
  sColor5 = bError5 ? 'error' : sColor5;
  sColor6 = bError6 ? 'error' : sColor6;

  return (
    <div className="app-pipeline">
      <Dialog
        TransitionComponent={Grow}
        onClose={cHandleDetailDialogClose}
        aria-labelledby="customized-dialog-title"
        open={bStateDetailDialogOpen}
        fullWidth={true}
        maxWidth={'md'}
      >

        <DialogTitle id="customized-dialog-title">
          {sStateTitle}
        </DialogTitle>

        <Divider></Divider>
        <DialogContent className={oClasses.dialogContent}>
          <Typography gutterBottom className={clsx({}, {
            [oClasses.visibilityHidden]: !oAppPipeline?.id,

          })}>
            <Stepper
              activeStep={iActiveStep}
              alternativeLabel
              connector={
                <StepConnector className={clsx(oClasses.stepConnector, {
                  [oClasses.stepConnectorFail]: oAppPipeline?.status == -1,
                  [oClasses.stepConnectorOngoing]: oAppPipeline?.status == 1

                })} />
              }
            >
              <Step active={oAppPipeline?.state == 1 && (oAppPipeline?.status == 1 || oAppPipeline?.status == -1)}>
                <StepButton
                  onClick={cHandleClickStep(1)}
                  completed={bCompleted1}
                  {...(bError1 && { icon: <ErrorIcon className={clsx(oClasses.stepButtonErrorIcon)}></ErrorIcon> })}

                >
                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor1}
                  >
                    {utilities.dateTime(oAppPipeline?.appDownloaderStage?.addedTime ?? '')}
                  </Typography>
                  <div className={clsx({
                    [oClasses.stepButtonDetailError]: bError1,
                    [oClasses.stepButtonDetailUnCompleted]: !bCompleted1
                  })}>資源同步 (-)</div>

                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor1}
                  >
                    {oAppPipeline?.appDownloaderStage?.times ?? 0}次
                  </Typography>
                </StepButton>

              </Step>
              <Step active={oAppPipeline?.state == 2 && (oAppPipeline?.status == 1 || oAppPipeline?.status == -1)}>  {/*  active=false 线未连动 | active=true 线已经联动 */}
                <StepButton
                  onClick={cHandleClickStep(2)}
                  completed={bCompleted2}  /*  completed=false 未完成进行中显示号码 | completed=true 已经完成打勾 */
                  {...(bError2 && { icon: <ErrorIcon className={clsx(oClasses.stepButtonErrorIcon)}></ErrorIcon> })}
                >
                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor2}
                  >
                    {utilities.dateTime(oAppPipeline?.appTranscoderStage?.startedTime ?? '')}
                  </Typography>
                  <div className={clsx({
                    [oClasses.stepButtonDetailError]: bError2,
                    [oClasses.stepButtonDetailUnCompleted]: !bCompleted2
                  })}>資源转码 ({oAppPipeline?.appTranscoderStage?.serverUuid ?? '-'})</div>

                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor2}
                  >
                    {oAppPipeline?.appTranscoderStage?.times ?? 0}次
                  </Typography>
                </StepButton>
              </Step>
              <Step active={oAppPipeline?.state == 3 && (oAppPipeline?.status == 1 || oAppPipeline?.status == -1)}>
                <StepButton
                  onClick={cHandleClickStep(3)}
                  completed={bCompleted3}
                  {...(bError3 && { icon: <ErrorIcon className={clsx(oClasses.stepButtonErrorIcon)}></ErrorIcon> })}

                >
                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor3}
                  >
                    {utilities.dateTime(oAppPipeline?.appEncrypterStage?.startedTime ?? '')}
                  </Typography>
                  <div className={clsx({
                    [oClasses.stepButtonDetailError]: bError3,
                    [oClasses.stepButtonDetailUnCompleted]: !bCompleted3
                  })}>資源加密 ({oAppPipeline?.appEncrypterStage?.serverUuid ?? '-'})</div>

                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor3}
                  >
                    {oAppPipeline?.appEncrypterStage?.times ?? 0}次
                  </Typography>
                </StepButton>

              </Step>
              <Step active={oAppPipeline?.state == 4 && (oAppPipeline?.status == 1 || oAppPipeline?.status == -1)}>
                <StepButton
                  onClick={cHandleClickStep(4)}
                  completed={bCompleted4}
                  {...(bError4 && { icon: <ErrorIcon className={clsx(oClasses.stepButtonErrorIcon)}></ErrorIcon> })}

                >
                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor4}
                  >
                    {utilities.dateTime(oAppPipeline?.appUploaderStage?.startedTime ?? '')}
                  </Typography>
                  <div className={clsx({
                    [oClasses.stepButtonDetailError]: bError4,
                    [oClasses.stepButtonDetailUnCompleted]: !bCompleted4
                  })}>資源上云 ({oAppPipeline?.appUploaderStage?.serverUuid ?? '-'})</div>

                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor4}
                  >
                    {oAppPipeline?.appUploaderStage?.times ?? 0}次
                  </Typography>
                </StepButton>
              </Step>
              <Step active={oAppPipeline?.state == 5 && (oAppPipeline?.status == 1 || oAppPipeline?.status == -1)}>
                <StepButton
                  onClick={cHandleClickStep(5)}
                  completed={bCompleted5}
                  {...(bError5 && { icon: <ErrorIcon className={clsx(oClasses.stepButtonErrorIcon)}></ErrorIcon> })}

                >
                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor5}
                  >
                    {utilities.dateTime(oAppPipeline?.appNotifierStage?.startedTime ?? '')}
                  </Typography>
                  <div className={clsx({
                    [oClasses.stepButtonDetailError]: bError5,
                    [oClasses.stepButtonDetailUnCompleted]: !bCompleted5
                  })}>資源回调 ({oAppPipeline?.appNotifierStage?.serverUuid ?? '-'})</div>

                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor5}
                  >
                    {oAppPipeline?.appNotifierStage?.times ?? 0}次
                  </Typography>
                </StepButton>
              </Step>
              <Step active={oAppPipeline?.state == 6 && (oAppPipeline?.status == 1 || oAppPipeline?.status == -1)}>

                <StepButton
                  onClick={cHandleClickStep(6)}
                  completed={bCompleted6}
                  {...(bError6 && { icon: <ErrorIcon className={clsx(oClasses.stepButtonErrorIcon)}></ErrorIcon> })}

                >
                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor6}
                  >
                    {utilities.dateTime(oAppPipeline?.appWarmerStage?.startedTime ?? '')}
                  </Typography>
                  <div className={clsx({
                    [oClasses.stepButtonDetailError]: bError6,
                    [oClasses.stepButtonDetailUnCompleted]: !bCompleted6
                  })}>資源预热 ({oAppPipeline?.appWarmerStage?.serverUuid ?? '-'})</div>
                  <Typography
                    display={'block'}
                    align={'center'}
                    variant="caption"
                    color={sColor6}
                  >
                    {oAppPipeline?.appWarmerStage?.times ?? 0}次
                  </Typography>
                </StepButton>
              </Step>
            </Stepper>
            <div className={clsx(oClasses.detail, {
              [oClasses.displayNone]: iStateActiveStep != 1,
              [oClasses.detailError]: bError1
            })}>
              <div>⎯資源同步内容⎯</div>
              <div className={clsx(oClasses.detailStageNote)}>{utilities.dateTime(oAppPipeline?.appDownloaderStage?.editedTime ?? '')}&nbsp;{oAppPipeline?.appDownloaderStage?.note ?? ''}&nbsp;</div>
              <div className={clsx(oClasses.detailAction)}>{oAppPipeline?.appDownloaderStage?.path ?? ''}</div>

            </div>

            <div className={clsx(oClasses.detail, {
              [oClasses.displayNone]: iStateActiveStep != 2,
              [oClasses.detailError]: bError2
            })}>
              <div>⎯資源转码内容⎯</div>
              <div className={clsx(oClasses.detailStageNote)}>{utilities.dateTime(oAppPipeline?.appTranscoderStage?.editedTime ?? '')}&nbsp;{oAppPipeline?.appTranscoderStage?.note ?? ''}</div>
              {oAppPipeline?.appTranscoderStage?.actions.map((oAction: any, skey: string) => (<div key={skey} className={clsx(oClasses.detailAction)}>{oAction?.path ?? ''}</div>))}
            </div>

            <div className={clsx(oClasses.detail, {
              [oClasses.displayNone]: iStateActiveStep != 3,
              [oClasses.detailError]: bError3
            })}>
              <div>⎯資源加密内容⎯</div>
              <div className={clsx(oClasses.detailStageNote)}>{utilities.dateTime(oAppPipeline?.appEncrypterStage?.editedTime ?? '')}&nbsp;{oAppPipeline?.appEncrypterStage?.note ?? ''}</div>
              {oAppPipeline?.appEncrypterStage?.actions.map((oAction: any, skey: string) => (<div key={skey} className={clsx(oClasses.detailAction)}>{oAction?.path ?? ''}</div>))}

            </div>

            <div className={clsx(oClasses.detail, {
              [oClasses.displayNone]: iStateActiveStep != 4,
              [oClasses.detailError]: bError4
            })}>
              <div>⎯資源上云内容⎯</div>
              <div className={clsx(oClasses.detailStageNote)}>{utilities.dateTime(oAppPipeline?.appUploaderStage?.editedTime ?? '')}&nbsp;{oAppPipeline?.appUploaderStage?.note ?? ''}</div>

              {oAppPipeline?.appUploaderStage?.actions.map((oAction: any, skey: string) => (<div key={skey} className={clsx(oClasses.detailAction)}>{oAction?.key ?? ''}</div>))}

            </div>
            <div className={clsx(oClasses.detail, {
              [oClasses.displayNone]: iStateActiveStep != 5,
              [oClasses.detailError]: bError5
            })}>
              <div>⎯資源回调内容⎯</div>
              <div className={clsx(oClasses.detailStageNote)}>{utilities.dateTime(oAppPipeline?.appNotifierStage?.editedTime ?? '')}&nbsp;{oAppPipeline?.appNotifierStage?.note ?? ''}</div>

              {oAppPipeline?.appNotifierStage?.actions.map((oAction: any, skey: string) => (<div key={skey} className={clsx(oClasses.detailAction)}>{oAction?.url ?? ''}&nbsp;&rarr;&nbsp;{oAction?.note ?? ''}</div>))}
            </div>

            <div className={clsx(oClasses.detail, {
              [oClasses.displayNone]: iStateActiveStep != 6,
              [oClasses.detailError]: bError6
            })}>
              <div>⎯資源预热内容⎯</div>
              <div className={clsx(oClasses.detailStageNote)}>{utilities.dateTime(oAppPipeline?.appWarmerStage?.editedTime ?? '')}&nbsp;{oAppPipeline?.appWarmerStage?.note ?? ''}</div>
              {oAppPipeline?.appWarmerStage?.actions.map((oAction: any, skey: string) => (<div key={skey} className={clsx(oClasses.detailAction)}>{oAction?.key ?? ''}</div>))}

            </div>
          </Typography>
          {oAppPipeline?.id ? '' : <Components.LoadingIcon className={oClasses.loadingIcon}></Components.LoadingIcon>}

        </DialogContent>
        <Divider></Divider>

      </Dialog>
      <Dialog
        open={bStateTranscoderDialogOpen}
        onClose={cHandleTranscoderDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {sStateTitle}
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            手動轉碼&nbsp; <span className={clsx(oClasses.fileName)}>{sStateTitle ?? ''}</span>&nbsp;
            可能會造成任務阻塞, 確定要執行？
          </DialogContentText>
          <FormControl variant="outlined" className={clsx(oClasses.formControl, oClasses.formControlServerUuid)}>
            <InputLabel id="server-uuid">节点</InputLabel>
            <Select
              labelId="server-uuid"
              id="server-uuid"
              value={sStateServerUuid}
              onChange={cHandleChangeServerUuidOfSelect}
              label="节点"
            >
              <MenuItem className={oClasses.menuItem} value={'DEFAULT'} selected={true}>-</MenuItem>
              {aStateServers.map((oStateServer, sKey) => (
                <MenuItem key={sKey} className={oClasses.menuItem} value={oStateServer?.uuid ?? ''}>
                  <span className={oClasses.serverUuid}>{oStateServer?.uuid ?? ''}</span>
                  <span>, 负载</span>
                  <span className={oClasses.percentage}>{utilities.percentage(oStateServer.loadRate ?? 0)}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={cHandleTranscoderDialogClose} color="default" variant="outlined" autoFocus>
            取消
          </Button>
          <Button onClick={cHandleTranscoderDialogClick} color="primary" variant="outlined">
            {bStateButtonLoading ? <CircularProgress size={24} variant="indeterminate" thickness={5}></CircularProgress> : '确定'}
          </Button>
        </DialogActions>
      </Dialog>
      <div className={oClasses.top}>
        <div className={oClasses.searchWrapper}>
        <TextField
            className={clsx(oClasses.textField, oClasses.textFieldName)}
            id="keyword"
            label="关键字"
            size="small"
            variant="outlined"
            value={sStateKeyword}
            onChange={cHandleChangeKeywordOfTextField}
            onKeyPress={cHandleKeyPressKeywordOfTextField}
          />
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

          <FormControl variant="outlined" className={clsx(oClasses.formControl, oClasses.formControlState)}>
            <InputLabel id="state">进度</InputLabel>
            <Select
              labelId="state"
              id="state"
              value={iStateState}
              onChange={cHandleChangeStateOfSelect}
              label="进度"
            >
              <MenuItem className={oClasses.menuItem} value={0}>-</MenuItem>
              <MenuItem className={oClasses.menuItem} value={1}>同步中</MenuItem>
              <MenuItem className={oClasses.menuItem} value={2}>转码中</MenuItem>
              <MenuItem className={oClasses.menuItem} value={3}>加密中</MenuItem>
              <MenuItem className={oClasses.menuItem} value={4}>上云中</MenuItem>
              <MenuItem className={oClasses.menuItem} value={5}>回调中</MenuItem>
              <MenuItem className={oClasses.menuItem} value={6}>预热中</MenuItem>
              <MenuItem className={oClasses.menuItem} value={254}>完成了</MenuItem>

            </Select>
          </FormControl>
          <Button
            className={oClasses.button}
            color="primary"
            variant="outlined"
            endIcon={<SearchIcon></SearchIcon>}
            onClick={cHandleClickOfSearchButton}
          >
            搜索
          </Button>

          <Button
            className={oClasses.button}
            color="default"
            variant="outlined"
            endIcon={<CachedIcon></CachedIcon>}
            onClick={cHandleClickOfRefreshButton}
            
          >
            刷新
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
          ref={oDataGridRef}
          className={clsx(oClasses.dataGrid, {})}
          columns={aColumns}
          headerHeight={36}
          rowCount={aStateAppPipelines.length == 0 ? 0 : iStateCount}
          rows={aStateAppPipelines}
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
