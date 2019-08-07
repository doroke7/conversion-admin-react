import { Admin } from '@/Pages';

let aRoutes = [
  {
    path: '/admin',
    component: Admin.SignIn,
    exact: true,
  },
  {
    path: '/admin/sign-in',
    component: Admin.SignIn,
    exact: true,
  },
  {
    path: '/admin/room',
    component: Admin.Room,
    exact: true,
  },
];

export default aRoutes;
