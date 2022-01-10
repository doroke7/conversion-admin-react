import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import Clear from '@material-ui/icons/Clear';

import context from '@/contexts';
import utilities from '@/utilities';

import CONFIGS from '@/CONFIGS';

import style from './style';

let tab = context.tab;

function Tabs(oProps: any) {
  let classes = style(void 0);
  let aTabs = useContext(tab);

  let sPathname = oProps.location.pathname;
  let sMenuName = sPathname;

  let oMenus = utilities.deTree(CONFIGS.MENUS, 'menus', 'object', 'path');

  return (
    <div className={classes.wrapperTabs}>
      {Object.values(aTabs).map((_sMenuName: any, iIndex) => {
        if (!Object.prototype.hasOwnProperty.call(oMenus, _sMenuName)) {
          // TODO: 最好改写成 try catch
          // catch 到 Error 把 tab 的 storage 清空
          return <></>;
        }
        let oMenu = oMenus[_sMenuName];

        return (
          <Link
            key={iIndex}
            to={oMenu.path}
            className={clsx({
              [classes.tab]: sMenuName !== _sMenuName,
              [classes.tabEnable]: sMenuName === _sMenuName
            })}>
            {<oMenu.Icon className={classes.icon} />}
            <span className={classes.text}>{oMenu.text}</span>
            <Clear className={classes.clear} onClick={oProps.removeTab(iIndex)} />
          </Link>
        );
      })}
    </div>
  );
}

export default withRouter(Tabs);
