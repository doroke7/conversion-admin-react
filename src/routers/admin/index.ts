import { admin } from '@/pages/';

let aRoutes = [
  {
    path: '/admin',
    component: admin.Signin,
    exact: true,
  },
  {
    path: '/admin/signin',
    component: admin.Signin,
    exact: true,
  },
  {
    path: '/admin/room',
    component: admin.Room,
    exact: true,
  },
];

export default aRoutes;
