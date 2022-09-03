import React from 'react';

import AppUser from './AppUser/Index';
import OrderInfo from './OrderInfo/Index';
import AdminAdministrator from './AdminAdministrator/Index';
import Config from './Config/Index';
import Vod from './Vod/Index';
import None from './None/Index';
import Index from './Index/Index';

export default {
  AppUser,
  OrderInfo,
  AdminAdministrator,
  Config,
  Vod,
  None,
  Index,
  _: React.lazy(() => import('./_/Index'))
};
