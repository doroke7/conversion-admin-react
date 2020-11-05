import { Admin } from '@/Pages';

let aRoutes = [
  {
    path: '/admin',
    component: Admin._,
    exact: true
  },
  {
    path: '/admin/authentication/authentication/sign-in',
    component: Admin.Authentication.Authentication.SignIn,
    exact: true
  },
  {
    path: '/admin/resource/domain',
    component: Admin.Resource.Domain,
    exact: true
  },
  {
    path: '/admin/resource/room',
    component: Admin.Resource.Room,
    exact: true
  },
  {
    path: '/admin/resource/user',
    component: Admin.Resource.User,
    exact: true
  },
  {
    path: '/admin/resource/word',
    component: Admin.Resource.Word,
    exact: true
  },
  {
    path: '/admin/resource/administrator',
    component: Admin.Resource.Administrator,
    exact: true
  }
];

export default aRoutes;
