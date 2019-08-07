import { Admin } from '@/_pages';

let aRoutes = [
  {
    path: '/admin',
    component: Admin.Signin,
    exact: true,
  },
  {
    path: '/admin/signin',
    component: Admin.Signin,
    exact: true,
  },
  {
    path: '/admin/room',
    component: Admin.Room,
    exact: true,
  },
];

export default aRoutes;
