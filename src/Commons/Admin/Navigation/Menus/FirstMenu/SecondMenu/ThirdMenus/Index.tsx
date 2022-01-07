import React, { useContext, useEffect } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

function ThirdMenus(oProps: any) {
  let cOnclick = oProps.onClick;
  let aMenus: any[] = oProps.menus;

  useEffect(() => {
    // componentDidMount is here!
  }, []);

  return (
    <>
      {aMenus.map((oMenu: any, iIndex: any) => (
        <MenuItem key={oMenu.id} onClick={cOnclick(oMenu)}>
          {oMenu.text}
        </MenuItem>
      ))}
    </>
  );
}

export default ThirdMenus;
