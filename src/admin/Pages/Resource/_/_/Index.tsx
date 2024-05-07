import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Hocs from '@/admin/Hocs';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oMatch = useRouteMatch();
  let oAuthorizations = useSelector((oStore: any) => (oStore.authorizations));



  return (
    <div>

    </div>
  );
}
export default Hocs.authorization(Hocs.title(Index));
