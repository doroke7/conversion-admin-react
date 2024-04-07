import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';

import wrappers from '@/admin/wrappers';

import Icon from './Icon/Index';
import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oRouteMatch = useRouteMatch();
  let [oState, cSetState] = useState<any>({
    animation: false
  });

  useEffect(() => {
    (async () => {
      cSetState({ animation: true });
      await new Promise((cResolve) => setTimeout(cResolve, 300));
      cSetState({ animation: false });
    })();
    return () => {};
  }, [oRouteMatch.url]);

  return (
    <div
      className={clsx(oClasses.root, {
        [oClasses.rootAnimation]: oState.animation
      })}>
      <Icon></Icon>
      <div className={oClasses.text}>⎯分页组件未定义⎯</div>
    </div>
  );
}
export default wrappers.authenticator(wrappers.tab(wrappers.title(Index)));
