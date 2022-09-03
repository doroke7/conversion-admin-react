import React from 'react';

import AppUser from './AppUser/';
import OrderInfo from './OrderInfo/';
import AdminAdministrator from './AdminAdministrator/';
import Config from './Config/';
import Vod from './Vod/';
import None from './None/';
import Index from './Index/';

/**
 * import Config from './Config/'; 相当 import Config from './Config/Index.ts';
 * import Config from './Config/Index'; 相当 import Config from './Config/Index/index.tsx';
 * import Config from './Config/Index'; 相当 import Config from './Config/Index/index.tsx';

 */
export default {
  AppUser: AppUser,
  OrderInfo: OrderInfo,
  AdminAdministrator: AdminAdministrator,
  Config: Config,
  Vod: Vod,
  None: None,
  Index: Index,
  _: React.lazy(() => import('./_/Index'))
};
