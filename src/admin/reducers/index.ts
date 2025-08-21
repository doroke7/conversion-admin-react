import authorization from './authorization/index';
import authorizations from './authorizations/index';

import me from './me/index';
import adminUser from './adminUser/index';
import app from './app/index';
import adminUsers from './adminUsers/index';
import appUsers from './appUsers/index';
import appPipelines from './appPipelines/index';
import appPipeline from './appPipeline/index';

export default {
  authorization: authorization,
  authorizations: authorizations,
  me: me,
  app: app,
  adminUser: adminUser,
  adminUsers: adminUsers,
  appUsers: appUsers,
  appPipelines: appPipelines,
  appPipeline: appPipeline
};
