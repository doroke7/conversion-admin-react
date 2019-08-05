
import aService from './service';
import aAdmin from './admin';

const aRoutes = [
  ...aService,
  ...aAdmin
];

export default aRoutes;