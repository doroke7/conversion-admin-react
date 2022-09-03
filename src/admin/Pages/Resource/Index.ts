import React from 'react';

import AppUser from './AppUser/';
import OrderInfo from './OrderInfo/';
import AdminAdministrator from './AdminAdministrator/';
import Config from './Config/';
import Vod from './Vod/';
import None from './None/';
import Index from './Index/';

export default {
  AppUser: AppUser.Index,
  OrderInfo: OrderInfo.Index,
  AdminAdministrator: AdminAdministrator.Index,
  Config: Config.Index,
  Vod: Vod.Index,
  None: None.Index,
  Index: Index.Index,
  _: React.lazy(() => import('./_/Index'))
};
