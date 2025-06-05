import React, { useContext, useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';



import events from '@/admin/events/index';
import utilities from '@/admin/utilities/index';
import Helpers from '@/admin/Helpers/Index';
import CONFIGS from '@/CONFIGS/INDEX';
import Compoents from '@/admin/Components/Index';

import Sdks from '@/admin/Sdks/Index';
import hooks from '@/admin/hooks/index';
import actions from '@/admin/actions/';

import style from './style';


function Backdrop(oProps: any) {
  let bOpen = oProps.open ?? false;
  let bError = oProps.error ?? false;

  let sVariant: 'indeterminate' | 'determinate' = bError ? 'determinate' : 'indeterminate';

  let oClasses = style(void 0);


  return (
    bOpen ?
      <div className={clsx(oClasses.root)}>
        <LinearProgress className={clsx(null, {
          [oClasses.progressError]: bError
        })}
          variant={sVariant}
          value={0}
          valueBuffer={0}
        />
        {bError ? <div className={oClasses.box}>
          <Compoents.ServerErrorIcon className={oClasses.serverErrorIcon}></Compoents.ServerErrorIcon>
          <div className={clsx(oClasses.title)}>服务器异常</div>
          <div className={clsx(oClasses.description)}>-请联系系统管理员或稍后再试-</div>
        </div> : <></>}
      </div> : <></>
  );
}

export default Backdrop;
