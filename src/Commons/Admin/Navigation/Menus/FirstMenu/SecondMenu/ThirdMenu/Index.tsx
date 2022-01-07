import React, { useContext, useEffect } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

function ThirdMenu(oProps: any) {
  let cOnclick = oProps.onClick;
  let sText: string = oProps.text;

  useEffect(() => {
    // componentDidMount is here!
  }, []);

  const [oState, setState] = React.useState<any>({
    menus: {},
    anchors: {}
  });

  return <MenuItem onClick={cOnclick}>{sText}</MenuItem>;
}

export default ThirdMenu;
