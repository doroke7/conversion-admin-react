import React from 'react';

import AppUser from './AppUser/Index';
import None from './None/Index';
import Index from './Index/Index';
import AppPipeline from './AppPipeline/Index';
import App from './App/Index';
import AdminRole from './AdminRole/Index';

/**
 * import Config from './Config/'; 相当 import Config from './Config/Index.ts';
 * 
 * 
 * import Config from './Config/Index'; 不可以相当 import Config from './Config/Index/index.tsx';
 * import Config from './Config/Index'; 可以相当 import Config from './Config/Index.tsx';
 * 
 * 
 * import Config from './Config'; 相当 import Config from './Config/index.tsx';
 * import Config from './Config'; 相当 import Config from './Config.tsx';

 */
export default {
  AppPipeline: AppPipeline,
  App: App,
  AppUser: AppUser,
  AdminRole: AdminRole,
  None: None,
  Index: Index,
  _: React.lazy(() => import('./_/Index'))
};
