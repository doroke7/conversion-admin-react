import React, { useContext, useEffect } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

function ThirdMenus(oProps: any) {
  let cOnclick = oProps.onClick;
  let sText: string = oProps.text;
  let aMenus: any[] = oProps.menus;

  useEffect(() => {
    // componentDidMount is here!
  }, []);

  const [oState, setState] = React.useState<any>({
    menus: {},
    anchors: {}
  });

  return (
    <></>
  );
}

export default ThirdMenus;
