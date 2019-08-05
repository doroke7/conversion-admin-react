import {
  admin
} from '@/pages/';

let aRoutes = [
  {
    path: '/admin',
    component: admin.Login,
    exact: true
  },
  {
    path: '/admin/login',
    component: admin.Login,
    exact: true
  }
];

export default aRoutes;