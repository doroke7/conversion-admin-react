import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBox from '@material-ui/icons/AccountBox';

import {
  tab
} from '@/contexts';

import {
  MENUS
} from '@/CONFIGS';

import style from './style';

function Tabs(oProps: any) {
  let classes = style(void 0);
  let aTabs = useContext(tab);

  console.log(aTabs);

  let sPathname = oProps.location.pathname;
  let sMenuName = sPathname.replace(/^\/admin\//gi, '').replace(/\/\w*/gi, '');

  return (
    <div>
      {Object.values(aTabs).map((_sMenuName: any, iIndex) => {
        let oMenu = MENUS[_sMenuName];
        return (
        <Link to={"/admin" + oMenu.path} className={clsx({
          [classes.tab]: sMenuName !== _sMenuName,
          [classes.tabEnable]: sMenuName === _sMenuName,
        })}>
        {<oMenu.Icon />}
        {oMenu.text}
        </Link>
        )
      })}
    </div>
  );
}

export default withRouter(Tabs);