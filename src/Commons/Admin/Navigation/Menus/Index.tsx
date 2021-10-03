import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';

import List from '@material-ui/core/List';

import FirstMenu from './FirstMenu/Index';

import CONFIGS from '@/CONFIGS/';
import style from './style';

function Menus(oProps: any) {
  let classes = style(void 0);

  useEffect(() => {
    // componentDidMount is here!

    return () => {
      // componentWillUnmount is here!
    };
  }, []);

  const [oState, setState] = React.useState<any>({
    menus: {},
    anchors: {}
  });

  return (
    <List>
      {CONFIGS.MENUS.map((oMenu: any, iIndex: any) => (
        <FirstMenu menu={oMenu} key={oMenu.id}></FirstMenu>
      ))}
    </List>
  );
}

export default withRouter(Menus);
