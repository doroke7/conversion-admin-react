import React from 'react';

import AppUser from './AppUser/Index';
import OrderInfo from './OrderInfo/Index';
import AdminAdministrator from './AdminAdministrator/Index';
import Config from './Config/Index';
import Vod from './Vod/Index';
import None from './None/Index';
import Index from './Index';

/**
 * import Config from './Config/'; 相当 import Config from './Config/Index.ts';
 * import Config from './Config/Index'; 相当 import Config from './Config/Index/index.tsx';
 * import Config from './Config'; 相当 import Config from './Config/index.tsx';

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
