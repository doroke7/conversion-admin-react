import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Clear from '@material-ui/icons/Clear';

import { tab } from '@/contexts';

import { MENUS } from '@/CONFIGS';

import style from './style';

function Tabs(oProps: any) {
  let classes = style(void 0);
  let aTabs = useContext(tab);

  let sPathname = oProps.location.pathname;
  let sMenuName = sPathname;

  return (
    <div className={classes.wrapperTabs}>
      {Object.values(aTabs).map((_sMenuName: any, iIndex) => {
        let oMenu = MENUS[_sMenuName];
        return (
          <Link
            key={iIndex}
            to={oMenu.path}
            className={clsx({
              [classes.tab]: sMenuName !== _sMenuName,
              [classes.tabEnable]: sMenuName === _sMenuName
            })}
          >
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
