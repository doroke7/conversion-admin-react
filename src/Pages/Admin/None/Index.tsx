import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { Admin } from '@/Commons';

import Icon from './Icon';
import style from './style';

function None(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();

  return (
    <div className={oClasses.root}>
      <div className={oClasses.wrapper}>
        <Icon></Icon>
        <div>
          <Button variant="outlined" color="primary">
            回到主页
          </Button>
        </div>
      </div>
    </div>
  );
}
export default None;
