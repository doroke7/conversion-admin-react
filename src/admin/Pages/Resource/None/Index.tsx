import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';

import Hocs from '@/admin/Hocs';

import Icon from './Icon/Index';
import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oRouteMatch = useRouteMatch();

  let [bStateAnimation, cSetStateAnimation] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      cSetStateAnimation(true);
      await new Promise((cResolve) => setTimeout(cResolve, 300));
      cSetStateAnimation(false);

    })();
    return () => {};
  }, [oRouteMatch.url]);

  return (
    <div
      className={clsx(oClasses.root, {
        [oClasses.rootAnimation]: bStateAnimation
      })}>
      <Icon></Icon>
      <div className={oClasses.text}>⎯分页组件未定义⎯</div>
    </div>
  );
}
export default Hocs.authorization(Hocs.tab(Hocs.title(Index)));
