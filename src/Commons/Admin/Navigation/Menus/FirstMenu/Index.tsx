import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';


function FirstMenu(oProps: any) {

  useEffect(() => {
    // componentDidMount is here!

  }, []);

  const [oState, setState] = React.useState<any>({
    menus: {},
    anchors: {}
  });

 

  return (
    <>

    </>
  );
}

export default withRouter(FirstMenu);
