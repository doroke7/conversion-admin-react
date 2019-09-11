import { Admin } from '@/Pages';

let aRoutes = [
  {
    path: '/admin',
    component: Admin._,
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
  {
    path: '/admin/user',
    component: Admin.User,
    exact: true,
  },
  {
    path: '/admin/word',
    component: Admin.Word,
    exact: true,
  },
  {
    path: '/admin/administrator',
    component: Admin.Administrator,
    exact: true,
  },
];

export default aRoutes;
