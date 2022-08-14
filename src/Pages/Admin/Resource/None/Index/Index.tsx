import React, { useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';

import wrappers from '@/wrappers';

import Icon from './Icon';
import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oRouteMatch = useRouteMatch();
  let [oState, cSetState] = React.useState<any>({
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
      <div className={oClasses.text}>-分页组件未定义-</div>
    </div>
  );
}
export default wrappers.admin.tab(wrappers.admin.title(Index));
