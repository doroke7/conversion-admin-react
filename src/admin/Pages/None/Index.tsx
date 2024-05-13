import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

import Icon from './Icon/Index';
import style from './style';

function None(oProps: any): any {
  let oClasses: any = style(void 0);

  let oMatch = useRouteMatch();
  let oHistory = useHistory();

  let oHandleClick = (oEvent: React.MouseEvent) => {
    oHistory.push('/admin/resource');
  };

  return (
    <Fade in={true} timeout={500}>
      <div className={oClasses.root}>
        <div className={oClasses.wrapper}>
          <Icon></Icon>
          <div className={oClasses.buttonWrapperWrapper}>
            <div className={oClasses.buttonWrapper}>
              <Button className={oClasses.button} variant="outlined" color="default" onClick={oHandleClick}>
                回到主页
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
export default None;
