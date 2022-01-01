import React, { useContext, useEffect } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';


function ThirdMenu(oProps: any) {
  let oMenu = oProps.menu;
  let cHandleShiftAway = oProps.handleShiftAway;
  useEffect(() => {
    // componentDidMount is here!

  }, []);

  const [oState, setState] = React.useState<any>({
    menus: {},
    anchors: {}
  });

 

  return (
    <MenuItem key={oMenu.id} onClick={cHandleShiftAway(oMenu)}>
      {oMenu.text}
    </MenuItem>
  );
}

export default ThirdMenu;
