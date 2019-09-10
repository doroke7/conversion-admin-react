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
      {Object.values(aTabs).map((oTab: any, iIndex) => {
        let sName = oTab.path.replace(/^\//gi, '');
        let oMenu = MENUS[sName];
        return (
        <Link to={"/admin" + oTab.path} className={clsx({
          [classes.tab]: sMenuName !== oTab.path.replace(/^\//gi, ''),
          [classes.tabEnable]: sMenuName === oTab.path.replace(/^\//gi, ''),
        })}>
        {<oMenu.Icon />}
        {oTab.text}
        </Link>
        )
      })}
    </div>
  );
}

export default withRouter(Tabs);