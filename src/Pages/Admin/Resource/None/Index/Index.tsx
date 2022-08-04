import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Icon from './Icon';
import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  return (
    <div className={oClasses.root}>
      <Icon></Icon>
      <div className={oClasses.text}>-页面组件未定义-</div>
    </div>
  );
}
export default Index;
